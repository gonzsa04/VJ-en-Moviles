package es.ucm.fdi.interfaces;

import java.util.ArrayList;

public abstract class AbstractInput implements InputInterface {
    protected ArrayList<TouchEvent> eventList_;

    public AbstractInput(){
        eventList_ = new ArrayList<TouchEvent>();
    }

    synchronized public ArrayList<TouchEvent> getTouchEvents(){
        ArrayList<TouchEvent> aux = new ArrayList<TouchEvent>();
        aux.addAll(eventList_);
        eventList_.clear();
        return aux;
    }
}
