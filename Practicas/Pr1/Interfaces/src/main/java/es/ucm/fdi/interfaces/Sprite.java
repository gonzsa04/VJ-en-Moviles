package es.ucm.fdi.interfaces;

import es.ucm.fdi.utils.Vector2;

public class Sprite {
    private ImageInterface image_;
    private int sLeft_;
    private int sTop_;
    private int sRight_;
    private int sBottom_;
    private int alpha_;
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
        sRight_ = image_.getWidth();
        sBottom_ = image_.getHeight();
        alpha_ = 1;
    }

    public Sprite(GraphicsInterface g, String name, Vector2 scale, int left, int top, int right, int bottom, int alpha) {
        g_ = g;
        scale_ = scale;
        image_ = g_.newImage(name);
        WIDTH = image_.getWidth();
        HEIGHT = image_.getHeight();
        sLeft_ = left;
        sTop_ = sTop_;
        sRight_ = right;
        sBottom_ = bottom;
        alpha_ = alpha;
    }

    public void draw() {
        g_.drawImage(image_, sLeft_, sTop_, sRight_, sBottom_, g_.getWidth()/2 - WIDTH*scale_.x/2, g_.getHeight()/2 - HEIGHT*scale_.y/2,
                scale_.x * WIDTH, scale_.y * image_.getHeight(), alpha_);
    }

    public void draw(Vector2 position) {
        g_.drawImage(image_, sLeft_, sTop_, sRight_, sBottom_, position.x - scale_.x * WIDTH / 2,
                position.y - scale_.x * HEIGHT / 2, scale_.x * WIDTH,
                scale_.y * HEIGHT, alpha_);
    }

    public void setScale(Vector2 scale) {
        scale_ = scale;
    }
}
