package es.ucm.fdi.interfaces;

import java.util.List;

public abstract class AbstractInput implements InputInterface {
    protected List<TouchEvent> eventList_;

    synchronized public List<TouchEvent> getTouchEvents(){
        List<TouchEvent> aux = eventList_;
        eventList_.clear();
        return aux;
    }
}
