package es.ucm.fdi.androidversion;

import android.content.Context;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.ImageInterface;

public class AndroidGame implements GameInterface, Runnable{
    private AndroidGraphics graphicsInstance_ = null;
    private AndroidInput inputInstance_ = null;
    private Context context_;
    private Thread thread_;
    volatile private boolean running_;

    //PROVISIONAL
    private ImageInterface imagePrueba;
    //PROVISIONAL

    public AndroidGame(Context context){
        context_ = context;
        //PROVISIONAL
        imagePrueba = getGraphics().newImage("Sprites/java.png");
        //PROVISIONAL
    }

    public AndroidGraphics getGraphics(){
        if(graphicsInstance_ == null)
            graphicsInstance_ = new AndroidGraphics(context_);
        return graphicsInstance_;
    }
    public AndroidInput getInput(){return null;}

    public void run(){
        while(running_){
            getGraphics().setCanvas();

            //PROVISIONAL
            getGraphics().drawImage(imagePrueba, 255);
            //PROVISIONAL

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
                break;
            }
            catch (InterruptedException ie){}
        }
    }
}