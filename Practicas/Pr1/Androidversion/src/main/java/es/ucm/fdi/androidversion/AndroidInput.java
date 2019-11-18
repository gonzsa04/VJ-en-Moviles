package es.ucm.fdi.androidversion;

import android.view.MotionEvent;
import android.view.View;

import es.ucm.fdi.interfaces.AbstractGraphics;
import es.ucm.fdi.interfaces.AbstractInput;
import es.ucm.fdi.utils.Vector2;

/**
 * Implementacion de la interfac de input para la plataforma Android
 */
public class AndroidInput extends AbstractInput implements View.OnTouchListener {

    public AndroidInput(){super();}

    /**
     * Callback llamado al ocurrir un evento en surfaceView, rellena la lista de eventos
     */
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

    // synchronized para la proteccion de la lista de eventos entre hebras

    synchronized public void mousePressed(MotionEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Pressed, e.getPointerId(e.getActionIndex()), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse pressed on position: " + e.getX() + ", " + e.getY() + " by ID: " + 0);
        eventList_.add(event);
    }

    synchronized public void mouseReleased(MotionEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Released, e.getPointerId(e.getActionIndex()), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse released on position: " + e.getX() + ", " + e.getY() + " by ID: " + 0);
        eventList_.add(event);
    }

    synchronized public void mouseDragged(MotionEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Dragged, e.getPointerId(e.getActionIndex()), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse dragged on position: " + e.getX() + ", " + e.getY() + " by ID: " + 0);
        eventList_.add(event);
    }
}
