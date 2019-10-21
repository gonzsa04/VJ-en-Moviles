package es.ucm.fdi.moviles.javaversion;

import java.awt.Color;
import java.awt.Graphics;

import javax.swing.JFrame;

import es.ucm.fdi.moviles.interfaces.GraphicsInterface;
import es.ucm.fdi.moviles.interfaces.ImageInterface;

public class PCGraphics extends JFrame implements GraphicsInterface {

    private Graphics g_;
    private java.awt.image.BufferStrategy strategy_;

    private void init(int winWidth, int winHeight){
        setSize(winWidth,winHeight);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setIgnoreRepaint(true);
        setStrategy();
    }

    private void setStrategy(){
        int veces = 100;
        do{
            try{
                createBufferStrategy(2);
                break;
            }
            catch(Exception e){}
        }while(veces-- > 0);

        if(veces == 0){
            System.err.println("El doble buffer no pudo cargarse");
        }
        strategy_ = getBufferStrategy();
    }

    public PCGraphics(String title, int winWidth, int winHeight){
        super(title);
        init(winWidth, winHeight);
        setVisible(true);
    }

    public ImageInterface newImage(String name){
        PCImage image = null;
        try{
            image = new PCImage(javax.imageio.ImageIO.read(new java.io.File(name)));
        }
        catch(Exception e){
            System.err.println("PCGraphics: Error leyendo la imagen");
        }
        return image;
    }

    public void clear(int color){

        g_.setColor(new Color(color));
        g_.fillRect(0,0,getWindowWidth(),getWindowHeight());
    }

    public void drawImage(ImageInterface image, int alpha){
        if(image != null)
            g_.drawImage(PCImage.class.cast(image).getImage(), 0, 0, null);
    }

    public void drawImage(ImageInterface image, float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        if(image != null)
            g_.drawImage(PCImage.class.cast(image).getImage(), (int)dstLeft, (int)dstTop, (int)dstRight, (int)dstBottom, null);
    }

    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        if(image != null)
            g_.drawImage(PCImage.class.cast(image).getImage(), (int)dstLeft, (int)dstTop, (int)dstRight,
                    (int)dstBottom, srcLeft, srcTop, srcRight, srcBottom, null);
    }

    public void updateDrawGraphics(){g_ = strategy_.getDrawGraphics();}
    public void releaseGraphics(){g_.dispose();}
    public java.awt.image.BufferStrategy getStrategy(){return strategy_;}

    public int getWindowWidth(){return getWidth();}
    public int getWindowHeight(){return getHeight();}
}
