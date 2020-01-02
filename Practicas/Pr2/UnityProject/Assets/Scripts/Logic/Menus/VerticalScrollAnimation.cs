using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VerticalScrollAnimation : MonoBehaviour
{
    public Transform targetPosition;
    public float delay = 0.5f;

    private Vector3 initialPosition;

    void Start()
    {
        initialPosition = gameObject.transform.position;
    }

    void Update()
    {
        if (transform.position.y >= targetPosition.position.y)
            Invoke("ResetAnimation", delay);
        else
            transform.Translate(Vector3.up * Time.deltaTime, Space.World);
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
