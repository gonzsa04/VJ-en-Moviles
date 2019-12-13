using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class Tile : MonoBehaviour
{
    public enum Direction
    {
        RIGHT,
        UP,
        LEFT,
        DOWN,
        UNDEFINED
    }

    public SpriteRenderer sprite0_;
    public SpriteRenderer sprite1_;

    public SpriteRenderer right_;
    public SpriteRenderer rightHint_;
    public SpriteRenderer up_;
    public SpriteRenderer upHint_;
    public SpriteRenderer left_;
    public SpriteRenderer leftHint_;
    public SpriteRenderer down_;
    public SpriteRenderer downHint_;

    public void setPressed(bool pressed)
    {
        sprite0_.gameObject.SetActive(!pressed);
        sprite1_.gameObject.SetActive(pressed);

        if (!pressed) quitPath();
    }

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

    private void quitPath()
    {
        right_.gameObject.SetActive(false);
        up_.gameObject.SetActive(false);
        left_.gameObject.SetActive(false);
        down_.gameObject.SetActive(false);
    }
}

