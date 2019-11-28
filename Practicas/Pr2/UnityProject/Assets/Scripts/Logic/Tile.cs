using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Tile : MonoBehaviour
{
    private bool pressed_;

    public SpriteRenderer sprite0_;
    public SpriteRenderer sprite1_;

    // Start is called before the first frame update
    void Start()
    {
        pressed_ = false;
    }

    public void setPressed(bool pressed)
    {
        pressed_ = pressed;

        sprite0_.gameObject.SetActive(!pressed_);
        sprite1_.gameObject.SetActive(pressed_);
    }

    public bool isPressed()
    {
        return pressed_;
    }
}
