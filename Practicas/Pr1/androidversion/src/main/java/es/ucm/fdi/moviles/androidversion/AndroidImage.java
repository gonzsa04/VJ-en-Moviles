package es.ucm.fdi.moviles.androidversion;
import es.ucm.fdi.moviles.interfaces.Image;

import android.graphics.Bitmap;

public class AndroidImage implements Image {
    private Bitmap image_;

    public AndroidImage(Bitmap image){ image_ = image; }
    public int getWidth(){return image_.getWidth();}
    public int getHeight(){return image_.getHeight();}
    public Bitmap getBitmap(){return image_;}
}
