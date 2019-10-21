package es.ucm.fdi.moviles.androidversion;

import android.graphics.Bitmap;

import es.ucm.fdi.moviles.interfaces.ImageInterface;

public class AndroidImage implements ImageInterface {
    private Bitmap image_;

    public AndroidImage(Bitmap image){ image_ = image; }
    public int getWidth(){return image_.getWidth();}
    public int getHeight(){return image_.getHeight();}
    public Bitmap getBitmap(){return image_;}
}
