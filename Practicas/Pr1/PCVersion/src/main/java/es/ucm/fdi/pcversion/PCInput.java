package es.ucm.fdi.pcversion;

import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.awt.event.MouseMotionListener;

import es.ucm.fdi.interfaces.AbstractGraphics;
import es.ucm.fdi.interfaces.AbstractInput;
import es.ucm.fdi.utils.Vector2;

/**
 * Implementacion de la interfaz de input para la plataforma PC
 */
public class PCInput extends AbstractInput implements MouseListener, MouseMotionListener {

    public PCInput(){super();}

    // synchronized para la proteccion de la lista de eventos entre hebras

    synchronized public void mouseClicked(MouseEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Clicked, e.getID(), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse clicked on position: " + e.getX() + ", " + e.getY() + " by ID: " + e.getID());
        eventList_.add(event);
    }

    synchronized public void mouseEntered(MouseEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Entered, e.getID(), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse entered on position: " + e.getX() + ", " + e.getY() + " by ID: " + e.getID());
        eventList_.add(event);
    }

    synchronized public void mouseExited(MouseEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Exited, e.getID(), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse exited on position: " + e.getX() + ", " + e.getY() + " by ID: " + e.getID());
        eventList_.add(event);
    }

    synchronized public void mousePressed(MouseEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Pressed, e.getID(), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse pressed on position: " + e.getX() + ", " + e.getY() + " by ID: " + e.getID());
        eventList_.add(event);
    }

    synchronized public void mouseReleased(MouseEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Released, e.getID(), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse released on position: " + e.getX() + ", " + e.getY() + " by ID: " + e.getID());
        eventList_.add(event);
    }

    synchronized public void mouseDragged(MouseEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Dragged, e.getID(), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse dragged on position: " + e.getX() + ", " + e.getY() + " by ID: " + e.getID());
        eventList_.add(event);
    }

    synchronized public void mouseMoved(MouseEvent e){
        Vector2 translatedPosition = AbstractGraphics.physicToLogic(e.getX(), e.getY());
        TouchEvent event = new TouchEvent(EventType.Moved, e.getID(), (int)translatedPosition.x, (int)translatedPosition.y);
        event.setMessage("mouse moved on position: " + e.getX() + ", " + e.getY() + " by ID: " + e.getID());
        eventList_.add(event);
    }
}
