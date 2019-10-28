package es.ucm.fdi.pcversion;

import java.awt.AlphaComposite;
import java.awt.Color;
import java.awt.Composite;
import java.awt.Graphics2D;

import javax.swing.JFrame;

import es.ucm.fdi.interfaces.GraphicsInterface;
import es.ucm.fdi.interfaces.ImageInterface;

public class PCGraphics extends JFrame implements GraphicsInterface {

    private Graphics2D g_;

    public PCGraphics(String title){
        super(title);
    }

    public void init(int winWidth, int winHeight){
        setSize(winWidth,winHeight);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setIgnoreRepaint(true);
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
        float a = (float)(alpha)/255f;
        if(image != null) {
            Composite alphaComp = AlphaComposite.getInstance(AlphaComposite.SRC_OVER, a);
            g_.setComposite(alphaComp);
            g_.drawImage(PCImage.class.cast(image).getImage(), 0, 0, null);
        }
    }

    public void drawImage(ImageInterface image, float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        if(image != null)
            g_.drawImage(PCImage.class.cast(image).getImage(), (int)dstLeft, (int)dstTop, (int)(dstRight),
                    (int)(dstBottom), null);
    }

    public void drawImage(ImageInterface image, int srcLeft, int srcTop, int srcRight, int srcBottom,
                          float dstLeft, float dstTop, float dstRight, float dstBottom, int alpha){

        if(image != null)
            g_.drawImage(PCImage.class.cast(image).getImage(), (int)dstLeft, (int)dstTop, (int)(dstRight + dstLeft),
                    (int)(dstBottom + dstTop), srcLeft, srcTop, srcRight, srcBottom, null);
    }

    public void setGraphics(Graphics2D g){g_ = g;}

    public int getWindowWidth(){return getWidth();}
    public int getWindowHeight(){return getHeight();}
}
