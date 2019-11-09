package es.ucm.fdi.androidversion;

import android.content.Context;
import android.graphics.Canvas;
import android.util.Log;
import android.view.SurfaceView;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.StateInterface;

public class AndroidGame implements GameInterface, Runnable{
    private AndroidGraphics graphicsInstance_ = null;
    private AndroidInput inputInstance_ = null;
    private Context context_;
    private Canvas canvas_;
    private SurfaceView surfaceView_;
    private Thread thread_;
    volatile private boolean running_;

    private StateInterface state_;

    public AndroidGame(Context context){
        context_ = context;
        surfaceView_ = new SurfaceView(context_);
    }

    public void setState(StateInterface state){
        state_ = state;
    }

    public AndroidGraphics getGraphics(){
        if(graphicsInstance_ == null)
            graphicsInstance_ = new AndroidGraphics(context_);
        return graphicsInstance_;
    }
    public AndroidInput getInput(){
        if(inputInstance_ == null) {
            inputInstance_ = new AndroidInput();
            surfaceView_.setOnTouchListener(inputInstance_);
        }
        return inputInstance_;
    }

    public SurfaceView getSurfaceView(){return surfaceView_;}

    public void run(){
        long lastFrameTime = System.nanoTime();

        getGraphics().setSurfaceView(surfaceView_);

        while(getGraphics().getWindowWidth() == 0){}
        getGraphics().scaleCanvas();

        while(running_){

            //--------------------------------------------INPUT-------------------------------------------------------
            state_.handleInput();

            //--------------------------------------------UPDATE-------------------------------------------------------
            long currentTime = System.nanoTime();
            long nanoElapsedTime = currentTime - lastFrameTime;
            lastFrameTime = currentTime;
            double elapsedTime = (double) nanoElapsedTime / 1.0E9;
            state_.update(elapsedTime);

            //--------------------------------------------RENDER-------------------------------------------------------
            getGraphics().startFrame(); //lock
            state_.render();
            getGraphics().endFrame();     // unlock
        }
    }

    public void resume(){
        if(!running_){
            running_ = true;
            thread_ = new Thread(this);
            thread_.start();
        }
    }

    public void pause(){
        running_ = false;
        while(true){
            try{
                thread_.join();
                thread_ = null;
                break;
            }
            catch (InterruptedException ie){}
        }
    }
}