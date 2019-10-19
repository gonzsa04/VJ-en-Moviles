package es.ucm.fdi.moviles.interfaces;

import java.util.List;

public interface InputInterface {
    class TouchEvent{}
    public List<TouchEvent> getTouchEvents();
}
