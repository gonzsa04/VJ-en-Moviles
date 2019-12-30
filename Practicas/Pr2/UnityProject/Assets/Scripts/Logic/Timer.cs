using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Timer : MonoBehaviour
{
    public int minutes = 0;
    public int seconds = 30;

    public Text timerText;

    private float timer_;
    
    void Start()
    {
        timer_ = seconds + (minutes * 60);
    }

    void Update()
    {
        timer_ -= Time.deltaTime;

        string minutes = Mathf.Floor(timer_ / 60).ToString("00");
        string seconds = (timer_ % 60).ToString("00");

        if (!IsTimerFinished())
            timerText.text = string.Format("{0}:{1}", minutes, seconds);
    }

    public bool IsTimerFinished()
    {
        return (timer_ <= 0);
    }
}
