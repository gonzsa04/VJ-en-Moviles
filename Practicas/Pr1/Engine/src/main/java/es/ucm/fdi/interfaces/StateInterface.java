package es.ucm.fdi.interfaces;

public interface StateInterface {
    public void reset();
    public void update(double deltaTime);
    public void render();
    public void handleInput();
}
