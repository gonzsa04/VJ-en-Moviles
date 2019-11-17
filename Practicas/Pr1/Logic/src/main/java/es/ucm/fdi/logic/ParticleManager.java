package es.ucm.fdi.logic;

import java.util.ArrayList;
import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;

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

        for(int i = 0; i < size_; i++){
            particles_.add(new Particle(game_, "particle"));
            particles_.get(i).init();
        }

        reset();
    }

    public void spawnParticles(ColorType color){
        int num = new Random().nextInt(maxRange_ - minRange_ + 1) + minRange_;

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
            if(!spawned){
                particles_.get(i).reboot();
                spawned = true;
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
