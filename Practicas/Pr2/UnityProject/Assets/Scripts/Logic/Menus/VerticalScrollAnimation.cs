using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VerticalScrollAnimation : MonoBehaviour
{
    public Transform targetPosition;
    public float vel = 1.5f;
    public float delay = 0.5f;

    private Vector3 initialPosition;
    private Vector3 direction;

    void Start()
    {
        initialPosition = gameObject.transform.position;
        if (initialPosition.y < targetPosition.position.y) direction = Vector3.up;
        else direction = Vector3.down;
    }

    void Update()
    {
        if ((direction == Vector3.up && transform.position.y >= targetPosition.position.y) ||
            (direction == Vector3.down && transform.position.y <= targetPosition.position.y))
            Invoke("ResetAnimation", delay);
        else
            transform.Translate(direction * vel * Time.deltaTime, Space.World);
    }

    private void ResetAnimation()
    {
        gameObject.transform.position = initialPosition;
        gameObject.SetActive(false);
    }

    private void OnDisable()
    {
        ResetAnimation();
    }
}
