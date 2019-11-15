package es.ucm.fdi.interfaces;

import es.ucm.fdi.utils.Vector2;

public class Sprite {
    private ImageInterface image_;
    private int sLeft_;
    private int sTop_;
    private int sRight_;
    private int sBottom_;
    private int alpha_;
    private int totalCols_, totalRows_;
    private int WIDTH, HEIGHT;
    private Vector2 scale_;
    private GraphicsInterface g_;


    public Sprite(GraphicsInterface g, String name, Vector2 scale) {
        g_ = g;
        scale_ = scale;
        image_ = g_.newImage(name);
        WIDTH = image_.getWidth();
        HEIGHT = image_.getHeight();
        sLeft_ = 0;
        sTop_ = 0;
        sRight_ = WIDTH;
        sBottom_ = HEIGHT;
        alpha_ = 255;
    }

    public Sprite(GraphicsInterface g, String name, Vector2 scale, int totalRows, int totalCols, int frame, int alpha) {
        g_ = g;
        scale_ = scale;
        image_ = g_.newImage(name);
        WIDTH = image_.getWidth()/totalCols;
        HEIGHT = image_.getHeight()/totalRows;
        totalRows_ = totalRows;
        totalCols_ = totalCols;
        setFrame(frame);
        sRight_ = WIDTH;
        sBottom_ = HEIGHT;
        alpha_ = alpha;
    }

    public void draw() {
        g_.drawImage(image_, sLeft_, sTop_, sRight_, sBottom_, g_.getDefaultWidth()/2 - WIDTH*scale_.x/2, g_.getDefaultHeight()/2 - HEIGHT*scale_.y/2,
                scale_.x * WIDTH, scale_.y * HEIGHT, alpha_);
    }

    public void draw(float x, float y) {
        g_.drawImage(image_, sLeft_, sTop_, sRight_, sBottom_, x - scale_.x * WIDTH / 2,
                y - scale_.y * HEIGHT / 2, scale_.x * WIDTH,
                scale_.y * HEIGHT, alpha_);
    }


    public void draw(Vector2 position) {
        g_.drawImage(image_, sLeft_, sTop_, sRight_, sBottom_, position.x - scale_.x * WIDTH / 2,
                position.y - scale_.y * HEIGHT / 2, scale_.x * WIDTH,
                scale_.y * HEIGHT, alpha_);
    }

    public void setFrame(int frame){
        sLeft_ = (frame%totalCols_)*WIDTH;
        sTop_ = (frame/totalCols_)*HEIGHT;
    }

    public void setScale(Vector2 scale) {
        scale_ = scale;
    }

    public void setWidth(int width) {
        WIDTH = width;
    }
    public void setHeight(int height) {
        HEIGHT = height;
    }

    public int getWidth(){ return WIDTH; }
    public int getHeight(){ return HEIGHT; }
}
