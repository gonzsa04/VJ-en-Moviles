package es.ucm.fdi.moviles.javaversion;

import es.ucm.fdi.moviles.interfaces.GameInterface;
import es.ucm.fdi.moviles.interfaces.ImageInterface;

import java.awt.Graphics;
import java.awt.image.*;

public class PCGame implements GameInterface{
    private PCGraphics graphicsInstance_ = null;
    private PCInput inputInstance_ = null;
    private boolean running_;
    private BufferStrategy strategy_;
    private Graphics g_;

    private String winTitle_;
    private int winWidth_;
    private int winHeight_;

    //PROVISIONAL
    private ImageInterface imagePrueba;
    //PROVISIONAL

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

    public PCGame(String winTitle, int winWidth, int winHeight){
        winTitle_ = winTitle;
        winWidth_ = winWidth;
        winHeight_ = winHeight;
        running_ = true;

        //PROVISIONAL
        imagePrueba = getGraphics().newImage("Sprites/java.png");
        //PROVISIONAL

        setStrategy();
    }

    public PCGraphics getGraphics(){
        if(graphicsInstance_ == null)
            graphicsInstance_ = new PCGraphics(winTitle_, winWidth_, winHeight_);
        return graphicsInstance_;
    }

    public PCInput getInput(){return null;}

    public void run() {
        while (running_) { // haremos bucles de renderizado y logica. SEPARAR METODOS DE RENDER Y UPDATE EN OTRA CLASE, no todo dentro de la clase que hereda de JFrame

            //--------------------------------------------RENDER-------------------------------------------------------
            //Graphics g = ventana.getGraphics(); // hay que pedirle Graphics a la ventana, modificarlo y luego devolverselo
            do {
                do {
                    g_ = strategy_.getDrawGraphics();
                    getGraphics().setGraphics(g_); // en vez de pedirselo a la ventana, pedimos el buffer de dibujado a la strategy (donde puedo pintar)
                    try {
                        getGraphics().drawImage(imagePrueba, 0, 0, 200, 300,
                                200, 200, imagePrueba.getWidth(), imagePrueba.getHeight(), 255);
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

            try{ Thread.sleep(1); }
            catch(Exception e){}
        }// while
    }
}