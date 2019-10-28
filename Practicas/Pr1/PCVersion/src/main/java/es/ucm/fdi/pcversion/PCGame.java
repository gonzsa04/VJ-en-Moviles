package es.ucm.fdi.pcversion;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.ImageInterface;
import es.ucm.fdi.logic.LogicGame;

import java.awt.Graphics2D;
import java.awt.image.*;

public class PCGame implements GameInterface{
    private PCGraphics graphicsInstance_ = null;
    private PCInput inputInstance_ = null;
    private boolean running_;
    private BufferStrategy strategy_;
    private Graphics2D g_;

    private String winTitle_;
    private int winWidth_;
    private int winHeight_;

    //PROVISIONAL
    private LogicGame logic_;
    //PROVISIONAL

    public PCGame(String winTitle, int winWidth, int winHeight){
        winTitle_ = winTitle;
        winWidth_ = winWidth;
        winHeight_ = winHeight;
        running_ = true;

        getGraphics().init(winWidth, winHeight);

        setStrategy();
    }

    public void setLogic(LogicGame logic){
        logic_ = logic;
    }

    private void setStrategy(){
        int veces = 100;
        do{
            try{
                getGraphics().createBufferStrategy(2);
                break;
            }
            catch(Exception e){}
        }while(veces-- > 0);

        if(veces == 0){
            System.err.println("El doble buffer no pudo cargarse");
        }
        strategy_ = getGraphics().getBufferStrategy();
    }

    public PCGraphics getGraphics(){
        if(graphicsInstance_ == null)
            graphicsInstance_ = new PCGraphics(winTitle_);
        return graphicsInstance_;
    }

    public PCInput getInput(){return null;}

    public void run() {
        long lastFrameTime = System.nanoTime();

        while (running_) { // haremos bucles de renderizado y logica. SEPARAR METODOS DE RENDER Y UPDATE EN OTRA CLASE, no todo dentro de la clase que hereda de JFrame

            //--------------------------------------------UPDATE-------------------------------------------------------
            long currentTime = System.nanoTime();
            long nanoElapsedTime = currentTime - lastFrameTime;
            lastFrameTime = currentTime;
            double elapsedTime = (double) nanoElapsedTime / 1.0E9;
            logic_.update(elapsedTime);

            //--------------------------------------------RENDER-------------------------------------------------------
            do {
                do {
                    g_ = Graphics2D.class.cast(strategy_.getDrawGraphics());
                    getGraphics().setGraphics(g_); // en vez de pedirselo a la ventana, pedimos el buffer de dibujado a la strategy (donde puedo pintar)
                    getGraphics().clear(0xFF0000FF);
                    try {
                        logic_.render();
                    }
                    // no hay catch(...) porque no hay que declarar TODAS las excepciones -> los errores de programacion como salirnos de un vector, etc. no hay que declararlas
                    // solo si peta al cargar cosas, etc., como en init() al cargar la imagen
                    // asi nos asegurmos de que esto se ejecute siempre -> libera la variable graphics de ventana, si no habra leaks!!
                    finally {
                        g_.dispose();
                    }
                } while (strategy_.contentsRestored()); // idealmente este bucle solo se hara una vez, pero podria ser que entre medias perdiesemos el buffer (el. ALt+Tab), por lo que habria que repintarlo

                strategy_.show(); // mostramos el buffer de dibujado
            } while (strategy_.contentsLost());
            try {
                Thread.sleep(1);
            }
            catch(Exception e) {}
        }// while
    }
}