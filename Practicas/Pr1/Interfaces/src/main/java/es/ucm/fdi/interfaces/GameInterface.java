package es.ucm.fdi.interfaces;

public interface GameInterface {
    public void setState(StateInterface state);
    public GraphicsInterface getGraphics();
    public InputInterface getInput();
}
