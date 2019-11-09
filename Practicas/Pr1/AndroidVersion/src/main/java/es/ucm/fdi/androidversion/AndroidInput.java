package es.ucm.fdi.androidversion;

import android.view.MotionEvent;
import android.view.View;

import es.ucm.fdi.interfaces.AbstractInput;

public class AndroidInput extends AbstractInput implements View.OnTouchListener {

    public AndroidInput(){super();}

    public boolean onTouch(View v, MotionEvent event){
        if(event.getActionMasked() == MotionEvent.ACTION_DOWN || event.getActionMasked() == MotionEvent.ACTION_POINTER_DOWN){
            mousePressed(event);
        }
        else if(event.getActionMasked() == MotionEvent.ACTION_UP || event.getActionMasked() == MotionEvent.ACTION_POINTER_UP){
            mouseReleased(event);
        }
        else if(event.getActionMasked() == MotionEvent.ACTION_MOVE){
            mouseDragged(event);
        }
        return true;
    }

    synchronized public void mousePressed(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Pressed, e.getPointerId(e.getActionIndex()), (int)e.getX(), (int)e.getY());
        event.setMessage("mouse pressed on position: " + e.getX() + ", " + e.getY() + " by ID: " + 0);
        eventList_.add(event);
    }

    synchronized public void mouseReleased(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Released, e.getPointerId(e.getActionIndex()), (int)e.getX(), (int)e.getY());
        event.setMessage("mouse released on position: " + e.getX() + ", " + e.getY() + " by ID: " + 0);
        eventList_.add(event);
    }

    synchronized public void mouseDragged(MotionEvent e){
        TouchEvent event = new TouchEvent(EventType.Dragged, e.getPointerId(e.getActionIndex()), (int)e.getX(), (int)e.getY());
        event.setMessage("mouse dragged on position: " + e.getX() + ", " + e.getY() + " by ID: " + 0);
        eventList_.add(event);
    }
}
