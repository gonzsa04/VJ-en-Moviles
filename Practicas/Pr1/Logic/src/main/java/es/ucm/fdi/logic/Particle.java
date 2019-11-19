package es.ucm.fdi.logic;

import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.Sprite;

/**
 * Las particulas tendran un comportamiento similar a las pelotas
 */
public class Particle extends Ball {
    private float velX_;
    private float gravity_;
    private float alpha_;

    public Particle(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
        setPosition(game_.getGraphics().getGameWidth()/2, 0.0f);
        setVelocity(500);

        // su sprite queda a la espera de recibir una imagen (spritesheet),
        // ya que todas las particulas usaran la misma
        sprite_ = new Sprite(game_.getGraphics(), scale_,
                2, 10, 0, 255);

        gravity_ = 2000.0f;
        velX_ = 0;
        alpha_ = 255.0f;
        type_ = ColorType.WHITE;

        reboot();
    }

    public void render(){
        sprite_.setAlpha((int)alpha_);

        super.render();
    }

    /**actualiza sus posiciones y disminuye su alpha*/
    public void update(double deltaTime){
        velY_ += gravity_ * deltaTime;

        position_.x += velX_ * deltaTime;
        position_.y += velY_ * deltaTime;

        if(alpha_ > 0)
            alpha_ -= 200*deltaTime;
        else setActive(false); // al quedarse sin alpha, se desactiva -> fin de su vida
    }

    /**parametros aleatorios de velocidades y alpha*/
    public void reboot(){
        Random rnd = new Random();

        velX_ = rnd.nextInt(801) - 250;
        velY_ = -(rnd.nextInt(501) + 500);

        float size = 0.1f + rnd.nextFloat() * 0.5f;
        setScale(size, size);

        alpha_ = rnd.nextInt(100) + 100;

        setActive(true);
    }

    public void setColor(ColorType color){
        type_ = color;
        if(type_ == ColorType.WHITE)
            sprite_.setFrame(0);
        else
            sprite_.setFrame(10);
    }

    public Sprite getSprite() { return sprite_; }
}
