package es.ucm.fdi.pcversion;

import java.awt.Graphics2D;
import java.awt.image.BufferStrategy;

import javax.swing.JFrame;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.StateInterface;

/**
 * Implementacion del motor de juego para la plataforma PC
 */
public class PCGame implements GameInterface{
    private PCGraphics graphicsInstance_ = null;
    private PCInput inputInstance_ = null;

    private boolean running_;
    private BufferStrategy strategy_;
    private JFrame window_;
    private Graphics2D g_;

    private StateInterface state_; // estado actual a ejecutar

    /** Crea la ventana y establece la estrategia de doble buffer */
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

    // DOBLE BUFFER
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

    public PCInput getInput(){
        if(inputInstance_ == null) {
            inputInstance_ = new PCInput();

            // lo pone a la escucha de eventos de raton
            window_.addMouseListener(inputInstance_);
            window_.addMouseMotionListener(inputInstance_);
        }
        return inputInstance_;
    }

    public void run() {
        long lastFrameTime = System.nanoTime();

        while (running_) {
            getGraphics().scaleCanvas(); // ASPECT-RATIO. Posible mejora -> hacer solo cuando se reescale la ventana

            //------------------------------------INPUT-------------------------------------
            state_.handleInput();

            //------------------------------------UPDATE------------------------------------
            long currentTime = System.nanoTime();
            long nanoElapsedTime = currentTime - lastFrameTime;
            lastFrameTime = currentTime;
            double elapsedTime = (double) nanoElapsedTime / 1.0E9;
            state_.update(elapsedTime);

            //------------------------------------RENDER------------------------------------
            do {
                do {
                    try {
                        g_ = (Graphics2D) strategy_.getDrawGraphics();
                        getGraphics().setGraphics(g_); // pedimos el buffer de dibujado a la strategy (donde puedo pintar)
                        state_.render();
                    }
                    catch(Exception e){}

                    // nos asegurmos de que esto se ejecute siempre -> libera la variable graphics de ventana
                    finally {
                        if(g_ != null)
                            g_.dispose();
                    }
                } while (strategy_.contentsRestored());
                // idealmente este bucle solo se hara una vez, pero podria ser que entre medias perdiesemos el buffer
                // (ej. ALt+Tab), por lo que habria que repintarlo

                strategy_.show(); // mostramos el buffer de dibujado
            } while (strategy_.contentsLost());
        }// while
    }
}