package es.ucm.fdi.moviles.interfaces;

import java.util.List;

public interface Input {
    class TouchEvent{}
    public List<TouchEvent> getTouchEvents();
}
