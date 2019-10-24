package es.ucm.fdi.interfaces;

import java.util.List;

public interface InputInterface {
    class TouchEvent{}
    public List<TouchEvent> getTouchEvents();
}
