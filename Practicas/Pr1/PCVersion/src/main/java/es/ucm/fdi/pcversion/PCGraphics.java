package es.ucm.fdi.pcversion;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Composite;
import java.awt.Graphics2D;

import javax.swing.JFrame;

import es.ucm.fdi.interfaces.AbstractGraphics;
import es.ucm.fdi.interfaces.GraphicsInterface;
import es.ucm.fdi.interfaces.ImageInterface;

public class PCGraphics extends AbstractGraphics implements GraphicsInterface {
    private Graphics2D g_;
    private JFrame window_;

    public PCGraphics(JFrame window){
        window_ = window;
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
        g_.fillRect(0,0,getWidth(),getHeight());
    }

    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){
        if(image != null)
            g_.drawImage(PCImage.class.cast(image).getImage(), (int)dstLeft, (int)dstTop, (int)(dstRight + dstLeft),
                    (int)(dstBottom + dstTop), srcLeft, srcTop, srcRight, srcBottom, null);
    }

    public void setGraphics(Graphics2D g){g_ = g;}

    public void setCanvasSize(int x, int y){
        //reescalado del espacio de juego
    }

    public int getWidth(){return window_.getWidth();}
    public int getHeight(){return window_.getHeight();}
}
