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
    private bool timerFinishedCalled_;
    private bool paused_;

    public delegate void TimerFinished(); // This defines what type of method you're going to call.
    private TimerFinished timerFinished_; // This is the variable holding the method you're going to call.

    void Awake()
    {
        timer_ = seconds + (minutes * 60);
        initSeconds_ = timer_;
        timerFinishedCalled_ = false;
        paused_ = false;
    }

    void Update()
    {
        if (!paused_)
        {
            if (!IsTimerFinished())
                timer_ -= Time.deltaTime;
            else if (!timerFinishedCalled_)
            {
                timerFinishedCalled_ = true;
                timer_ = 0;
                if (timerFinished_ != null) timerFinished_();
            }

            UpdateText();
        }
    }

    private void UpdateText()
    {
        string minutes = Mathf.Floor(timer_ / 60).ToString("00");
        string seconds = (timer_ % 60).ToString("00");
        timerText.text = string.Format("{0}:{1}", minutes, seconds);
    }

    public void SetMethod(TimerFinished method)
    {
        timerFinished_ = method;
    }

    public void Reset()
    {
        timer_ = initSeconds_;
        UpdateText();
    }

    public void SetTime(float seconds)
    {
        timer_ = seconds;
        if (timer_ < 0)
            timer_ = 0;
        UpdateText();
    }

    public float GetTime()
    {
        return timer_;
    }

    public bool IsTimerFinished()
    {
        return (timer_ <= 0);
    }

    public void SetPaused(bool pause)
    {
        paused_ = pause;
    }

    private void OnDestroy()
    {
        timerFinished_ = null;
    }
}
