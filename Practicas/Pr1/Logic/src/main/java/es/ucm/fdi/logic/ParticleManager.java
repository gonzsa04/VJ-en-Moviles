package es.ucm.fdi.logic;

import java.util.ArrayList;
import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;

/**
 * Gestor de particulas. Las contiene en una pool, las pinta y las actualiza
 */
public class ParticleManager extends GameObject {
    GameInterface game_;

    ArrayList<Particle> particles_;
    private int maxRange_, minRange_, size_;

    public ParticleManager(GameInterface game, int minRange, int maxRange, int size){
        super(game, "particleManager");
        game_ = game;
        maxRange_ = maxRange;
        minRange_ = minRange;
        size_ = size;
    }

    public void init(){
        particles_ = new ArrayList<Particle>();

        // todas las particulas usaran el mismo spritesheet
        sprite_ = loadSprite("Sprites/balls.png", 2, 10, 0, 255);

        for(int i = 0; i < size_; i++){
            particles_.add(new Particle(game_, "particle"));
            particles_.get(i).init();
            particles_.get(i).getSprite().setImage(sprite_.getImage());
        }

        reset();
    }

    /**Spawnea un numero de particulas aleatorio dentro del rango, con un color determinado */
    public void spawnParticles(ColorType color){
        int num = new Random().nextInt(maxRange_ - minRange_ + 1) + minRange_;
        int numReused = 0;

        // coge la primera que se encuentra inactiva
        for(int i = 0; i < num; i++){
            boolean spawned = false;

            for(int j = 0; j < particles_.size(); j++){
                if(!particles_.get(j).isActive()){
                    particles_.get(j).setPosition(position_.x, position_.y);
                    particles_.get(j).setColor(color);
                    particles_.get(j).reboot();
                    spawned = true;
                    break;
                }
            }

            // si todas estan activas y necesita mas, reutiliza una que ya este usandose
            if(!spawned){
                particles_.get(numReused).reboot();
                numReused++;
                if(numReused >= particles_.size())numReused = 0;
            }
        }
    }

    public void reset(){
        for(int i = 0; i< particles_.size();i++){
            particles_.get(i).setActive(false);
        }
    }

    public void render(){
        for(int i = 0; i< particles_.size();i++){
            if(particles_.get(i).isActive())
                particles_.get(i).render();
        }
    }

    public void update(double deltaTime){
        for(int i = 0; i< particles_.size();i++){
            if(particles_.get(i).isActive())
                particles_.get(i).update(deltaTime);
        }
    }

    public boolean handleEvent(InputInterface.TouchEvent event){
        return false;
    }
}
