package es.ucm.fdi.moviles.androidversion;

import android.content.Context;

import es.ucm.fdi.moviles.interfaces.GameInterface;
import es.ucm.fdi.moviles.interfaces.ImageInterface;

//PROVISIONAL
//PROVISIONAL

public class Game implements GameInterface, Runnable{
    private Graphics graphicsInstance = null;
    private Input inputInstance = null;
    private Context context_;
    private Thread thread;
    volatile private boolean running;

    //PROVISIONAL
    private ImageInterface imagePrueba;
    //PROVISIONAL

    public Game(Context context){
        context_ = context;
        //PROVISIONAL
        getGraphics();
        imagePrueba = graphicsInstance.newImage("java.png");
        //PROVISIONAL
    }

    public Graphics getGraphics(){
        if(graphicsInstance == null)
            graphicsInstance = new Graphics(context_);
        return graphicsInstance;
    }
    public Input getInput(){return null;}

    public void run(){
        while(running){
            graphicsInstance.setCanvas();

            //PROVISIONAL
            graphicsInstance.drawImage(imagePrueba, 0, 0, 200, 300, 200, 200, imagePrueba.getWidth(), imagePrueba.getHeight(), 255);
            //PROVISIONAL

            graphicsInstance.releaseCanvas();
        }
    }

    public void resume(){
        if(!running){
            running = true;
            thread = new Thread(this);
            thread.start();
        }
    }

    public void pause(){
        running = false;
        while(true){
            try{
                thread.join();
                break;
            }
            catch (InterruptedException ie){}
        }
    }
}