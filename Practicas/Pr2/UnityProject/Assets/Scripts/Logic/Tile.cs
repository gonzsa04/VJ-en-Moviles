using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Tile : MonoBehaviour
{
    public SpriteRenderer sprite0_;
    public SpriteRenderer sprite1_;

    public void setPressed(bool pressed)
    {
        sprite0_.gameObject.SetActive(!pressed);
        sprite1_.gameObject.SetActive(pressed);
    }
}

