using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Tile : MonoBehaviour
{
    /// <summary>
    /// Posibles direcciones del Tile respecto al camino actual
    /// </summary>
    public enum Direction
    {
        RIGHT,
        UP,
        LEFT,
        DOWN,
        UNDEFINED
    }

    public SpriteRenderer unselected_;  // bloque no seleccionado
    public SpriteRenderer selected_;    // bloque seleccionado (piel)

    // camino y pistas
    public SpriteRenderer right_;
    public SpriteRenderer rightHint_;
    public SpriteRenderer up_;
    public SpriteRenderer upHint_;
    public SpriteRenderer left_;
    public SpriteRenderer leftHint_;
    public SpriteRenderer down_;
    public SpriteRenderer downHint_;

    /// <summary>
    /// Pulsa o no el Tile
    /// Pulsado: activa sprite de seleccionado / desactiva sprite de no seleccionado
    /// No pulsado: activa el sprite de no seleccionado / desactiva el sprite de seleccionado y desactiva el posible camino sobre el
    /// </summary>
    public void setPressed(bool pressed)
    {
        unselected_.gameObject.SetActive(!pressed);
        selected_.gameObject.SetActive(pressed);

        if (!pressed) quitPath();
    }

    /// <summary>
    /// Anyade camino sobre el Tile, dependiendo de la direccion indicada
    /// </summary>
    public void addPath(Direction dir)
    {
        switch (dir)
        {
            case Direction.RIGHT:
                right_.gameObject.SetActive(true);
                break;
            case Direction.UP:
                up_.gameObject.SetActive(true);
                break;
            case Direction.LEFT:
                left_.gameObject.SetActive(true);
                break;
            case Direction.DOWN:
                down_.gameObject.SetActive(true);
                break;
            default:
                break;
        }
    }

    /// <summary>
    /// Desactiva todos los caminos que pudiera haber sobre el Tile
    /// </summary>
    private void quitPath()
    {
        right_.gameObject.SetActive(false);
        up_.gameObject.SetActive(false);
        left_.gameObject.SetActive(false);
        down_.gameObject.SetActive(false);
    }
}

