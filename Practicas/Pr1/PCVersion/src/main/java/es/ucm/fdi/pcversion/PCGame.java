package es.ucm.fdi.pcversion;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.ImageInterface;
import es.ucm.fdi.interfaces.StateInterface;

import java.awt.Graphics2D;
import java.awt.image.*;

import javax.swing.JFrame;

public class PCGame implements GameInterface{
    private PCGraphics graphicsInstance_ = null;
    private PCInput inputInstance_ = null;
    private boolean running_;
    private BufferStrategy strategy_;
    private JFrame window_;
    private Graphics2D g_;

    private StateInterface state_;

    public PCGame(String winTitle, int winWidth, int winHeight){
        window_ = new JFrame(winTitle);
        window_.setSize(winWidth,winHeight);
        window_.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        window_.setIgnoreRepaint(true);
        window_.setVisible(true);

        running_ = true;

        setStrategy();
    }

    public void setState(StateInterface state){
        state_ = state;
    }

    private void setStrategy(){
        int veces = 100;
        do{
            try{
                window_.createBufferStrategy(2);
                break;
            }
            catch(Exception e){}
        }while(veces-- > 0);

        if(veces == 0){
            System.err.println("El doble buffer no pudo cargarse");
        }
        strategy_ = window_.getBufferStrategy();
    }

    public PCGraphics getGraphics(){
        if(graphicsInstance_ == null)
            graphicsInstance_ = new PCGraphics(window_);
        return graphicsInstance_;
    }

    public PCInput getInput(){return null;}

    public void run() {
        long lastFrameTime = System.nanoTime();

        while (running_) { // haremos bucles de renderizado y logica. SEPARAR METODOS DE RENDER Y UPDATE EN OTRA CLASE, no todo dentro de la clase que hereda de JFrame
            getGraphics().scaleCanvas();

            //--------------------------------------------UPDATE-------------------------------------------------------
            long currentTime = System.nanoTime();
            long nanoElapsedTime = currentTime - lastFrameTime;
            lastFrameTime = currentTime;
            double elapsedTime = (double) nanoElapsedTime / 1.0E9;
            state_.update(elapsedTime);

            //--------------------------------------------RENDER-------------------------------------------------------
            do {
                do {
                    try {
                        g_ = (Graphics2D) strategy_.getDrawGraphics();
                        getGraphics().setGraphics(g_); // en vez de pedirselo a la ventana, pedimos el buffer de dibujado a la strategy (donde puedo pintar)
                        state_.render();
                    }
                    // no hay catch(...) porque no hay que declarar TODAS las excepciones -> los errores de programacion como salirnos de un vector, etc. no hay que declararlas
                    // solo si peta al cargar cosas, etc., como en init() al cargar la imagen
                    // asi nos asegurmos de que esto se ejecute siempre -> libera la variable graphics de ventana, si no habra leaks!!
                    finally {
                        if(g_ != null)
                            g_.dispose();
                    }
                } while (strategy_.contentsRestored()); // idealmente este bucle solo se hara una vez, pero podria ser que entre medias perdiesemos el buffer (el. ALt+Tab), por lo que habria que repintarlo

                strategy_.show(); // mostramos el buffer de dibujado
            } while (strategy_.contentsLost());
        }// while
    }
}