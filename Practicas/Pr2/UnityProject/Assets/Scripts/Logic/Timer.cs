using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Timer : MonoBehaviour
{
    public int minutes = 0;
    public int seconds = 30;

    private float initSeconds_;

    public Text timerText;

    private float timer_;

    public delegate void TimerFinished(); // This defines what type of method you're going to call.
    private TimerFinished timerFinished_; // This is the variable holding the method you're going to call.

    void Awake()
    {
        timer_ = seconds + (minutes * 60);
        initSeconds_ = timer_;
    }

    void Update()
    {
        timer_ -= Time.deltaTime;

        string minutes = Mathf.Floor(timer_ / 60).ToString("00");
        string seconds = (timer_ % 60).ToString("00");

        if (!IsTimerFinished())
            timerText.text = string.Format("{0}:{1}", minutes, seconds);
        else timerFinished_();
    }

    public void SetMethod(TimerFinished method)
    {
        timerFinished_ = method;
    }

    public void Reset()
    {
        timer_ = initSeconds_;
    }

    public void SetTime(float seconds)
    {
        timer_ = seconds;
    }

    public bool IsTimerFinished()
    {
        return (timer_ <= 0);
    }
}
