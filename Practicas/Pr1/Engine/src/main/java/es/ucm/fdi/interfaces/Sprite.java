package es.ucm.fdi.interfaces;

import es.ucm.fdi.utils.Vector2;

/**
 * Clase que añade una capa de abstraccion sobre el pintado de imagenes.
 * englobando sus funciones basicas en un objeto que facilita su uso
 *
 * Nota: al pintar el sprite en una posicion, este se posicionara con su CENTRO
 * en dicha posicion, y no su esquina superior izquierda
 */
public class Sprite {
    private ImageInterface image_;
    private GraphicsInterface g_;

    private int sLeft_;
    private int sTop_;
    private int sRight_;
    private int sBottom_;

    private int alpha_;
    private int totalCols_, totalRows_; // columnas/filas de la imagen -> spritesheet
    private int WIDTH, HEIGHT;          // dimensiones de la imagen
    private Vector2 scale_;             // escala del objeto Sprite

    // constructora "por defecto"
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

    // constructora mas personalizable -> permite coger un frame especifico de un spritesheet
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

    /** dibuja el sprite en el medio de la pantalla */
    public void draw() {
        g_.drawImage(image_, sLeft_, sTop_, sRight_, sBottom_, g_.getGameWidth()/2 - WIDTH*scale_.x/2, g_.getGameHeight()/2 - HEIGHT*scale_.y/2,
                scale_.x * WIDTH, scale_.y * HEIGHT, alpha_);
    }

    /** dibuja el sprite en una posicion dada */
    public void draw(float x, float y) {
        g_.drawImage(image_, sLeft_, sTop_, sRight_, sBottom_, x - scale_.x * WIDTH / 2,
                y - scale_.y * HEIGHT / 2, scale_.x * WIDTH,
                scale_.y * HEIGHT, alpha_);
    }

    /** dibuja el sprite en una posicion dada */
    public void draw(Vector2 position) {
        g_.drawImage(image_, sLeft_, sTop_, sRight_, sBottom_, position.x - scale_.x * WIDTH / 2,
                position.y - scale_.y * HEIGHT / 2, scale_.x * WIDTH,
                scale_.y * HEIGHT, alpha_);
    }

    public void setFrame(int frame){
        sLeft_ = (frame%totalCols_)*WIDTH;
        sTop_ = (frame/totalCols_)*HEIGHT;
    }

    public void setAlpha(int alpha){
        alpha_ = alpha;
    }

    public void setScale(Vector2 scale) {
        scale_ = scale;
    }

    public void setScale(float x, float y){
        scale_.x = x;
        scale_.y = y;
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
