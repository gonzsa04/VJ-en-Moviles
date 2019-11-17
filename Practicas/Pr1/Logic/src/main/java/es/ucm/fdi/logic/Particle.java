package es.ucm.fdi.logic;

import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;

public class Particle extends Ball {
    private float velX_;
    private float gravity_;
    private float alpha_;

    public Particle(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
        gravity_ = 2000.0f;
        velX_ = 0;
        alpha_ = 255.0f;
    }

    public void render(){
        sprite_.setAlpha((int)alpha_);
        spriteAux_.setAlpha((int)alpha_);

        super.render();
    }

    public void update(double deltaTime){
        velY_ += gravity_ * deltaTime;

        position_.x += velX_ * deltaTime;
        position_.y += velY_ * deltaTime;

        if(alpha_ > 0)
            alpha_ -= 200*deltaTime;
        else setActive(false);
    }

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
    }
}
