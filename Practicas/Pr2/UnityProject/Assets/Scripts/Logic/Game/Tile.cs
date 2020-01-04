using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Componente de los objetos seleccionables que puede anyadir camino o pistas sobre ellos
/// </summary>
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

    [Tooltip("SpriteRenderer usado cuando el bloque no esta seleccionado")]
    public SpriteRenderer unselected_;
    [Tooltip("SpriteRenderer usado cuando el bloque esta seleccionado (piel)")]
    public SpriteRenderer selected_;

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
    public void SetPressed(bool pressed)
    {
        selected_.gameObject.SetActive(pressed);

        if (!pressed) QuitPath();
    }

    /// <summary>
    /// Anyade camino sobre el Tile, dependiendo de la direccion indicada
    /// </summary>
    public void AddPath(Direction dir)
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
    public void QuitPath()
    {
        right_.gameObject.SetActive(false);
        up_.gameObject.SetActive(false);
        left_.gameObject.SetActive(false);
        down_.gameObject.SetActive(false);
    }

    /// <summary>
    /// Anyade pista sobre el Tile, dependiendo de la direccion indicada
    /// </summary>
    public void AddHint(Direction dir)
    {
        switch (dir)
        {
            case Direction.RIGHT:
                rightHint_.gameObject.SetActive(true);
                break;
            case Direction.UP:
                upHint_.gameObject.SetActive(true);
                break;
            case Direction.LEFT:
                leftHint_.gameObject.SetActive(true);
                break;
            case Direction.DOWN:
                downHint_.gameObject.SetActive(true);
                break;
            default:
                break;
        }
    }

    /// <summary>
    /// Desactiva todas las pistas que pudiera haber sobre el Tile
    /// </summary>
    public void QuitHint()
    {
        rightHint_.gameObject.SetActive(false);
        upHint_.gameObject.SetActive(false);
        leftHint_.gameObject.SetActive(false);
        downHint_.gameObject.SetActive(false);
    }

    /// <summary>
    /// Establece la skin con la que aparecera el objeto
    /// </summary>
    public void SetSkin(Skin skin)
    {
        selected_.sprite = skin.selected;
        leftHint_.sprite = upHint_.sprite = rightHint_.sprite = downHint_.sprite = skin.hint;
    }

    /// <summary>
    /// Se le aplica al Sprite de seleccion un factor de escala
    /// </summary>
    /// <param name="scaleFactor">factor de escala a aplicar</param>
    public void SetSelectedScale(float scaleFactor)
    {
        selected_.transform.localScale = selected_.transform.localScale * scaleFactor;
    }

    /// <summary>
    /// Se le aplica al Sprite de no seleccion un factor de escala
    /// </summary>
    /// <param name="scaleFactor">factor de escala a aplicar</param>
    public void SetUnSelectedScale(float scaleFactor)
    {
        unselected_.transform.localScale = unselected_.transform.localScale * scaleFactor;
    }

    /// <summary>
    /// Devuelve el factor de escala aplicado sobre el Sprite de seleccion
    /// </summary>
    public Vector3 GetSelectedScale()
    {
        return selected_.transform.localScale;
    }

    /// <summary>
    /// Devuelve el factor de escala aplicado sobre el Sprite de no seleccion
    /// </summary>
    public Vector3 GetUnSelectedScale()
    {
        return unselected_.transform.localScale;
    }
}

