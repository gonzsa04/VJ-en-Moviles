package es.ucm.fdi.androidversion;

import android.content.Context;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.StateInterface;

public class AndroidGame implements GameInterface, Runnable{
    private AndroidGraphics graphicsInstance_ = null;
    private AndroidInput inputInstance_ = null;
    private Context context_;
    private Thread thread_;
    volatile private boolean running_;

    private StateInterface state_;

    public AndroidGame(Context context){
        context_ = context;
    }

    public void setState(StateInterface state){
        state_ = state;
    }

    public AndroidGraphics getGraphics(){
        if(graphicsInstance_ == null)
            graphicsInstance_ = new AndroidGraphics(context_);
        return graphicsInstance_;
    }
    public AndroidInput getInput(){return null;}

    public void run(){
        long lastFrameTime = System.nanoTime();

        while(running_){
            //--------------------------------------------UPDATE-------------------------------------------------------
            long currentTime = System.nanoTime();
            long nanoElapsedTime = currentTime - lastFrameTime;
            lastFrameTime = currentTime;
            double elapsedTime = (double) nanoElapsedTime / 1.0E9;
            state_.update(elapsedTime);

            //--------------------------------------------RENDER-------------------------------------------------------
            getGraphics().setCanvas();
            state_.render();
            getGraphics().releaseCanvas();
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