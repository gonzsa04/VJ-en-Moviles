package es.ucm.fdi.androidversion;

import android.view.MotionEvent;
import android.view.View;

import es.ucm.fdi.interfaces.AbstractInput;

public class AndroidInput extends AbstractInput implements View.OnTouchListener {
    public boolean onTouch(View v, MotionEvent event){



        return true;
    }

    synchronized public void mouseClicked(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Clicked, 0, e.getX(), e.getY());
        eventList_.add(event);
    }

    synchronized public void mouseEntered(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Entered,0, e.getX(), e.getY());
        eventList_.add(event);
    }

    synchronized public void mouseExited(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Exited,0, e.getX(), e.getY());
        eventList_.add(event);
    }

    synchronized public void mousePressed(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Pressed, 0, e.getX(), e.getY());
        eventList_.add(event);
    }

    synchronized public void mouseReleased(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Released, e.getID(), e.getX(), e.getY());
        eventList_.add(event);
    }

    synchronized public void mouseDragged(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Dragged, e.getID(), e.getX(), e.getY());
        eventList_.add(event);
    }

    synchronized public void mouseMoved(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Moved, e.getID(), e.getX(), e.getY());
        eventList_.add(event);
    }*/
}
