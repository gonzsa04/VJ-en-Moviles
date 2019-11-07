package es.ucm.fdi.interfaces;

import java.util.List;

import es.ucm.fdi.utils.Vector2;

public interface InputInterface {

    enum EventType { Clicked, Entered, Exited, Pressed, Released, Dragged, Moved }

    class TouchEvent{
        private EventType event_;
        private int id_;
        private Vector2 position_;

        public TouchEvent(EventType event, int id, int x, int y){
            event_ = event;
            id_ = id;
            position_ = new Vector2(x, y);
        }

        public EventType getEventType(){
            return event_;
        }
        public int getID(){
            return id_;
        }
        public Vector2 getPosition(){
            return position_;
        }
    }

    public List<TouchEvent> getTouchEvents();
}
