using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Componente Timer que lleva una cuenta atras, mostrando en un texto el tiempo que queda
/// Al acabar la cuenta atras, llama a la funcion definida por la variable timerFinished_
/// </summary>
public class Timer : MonoBehaviour
{
    [Tooltip("Minutos de la cuenta atras")]
    public int minutes = 0;
    [Tooltip("Segundos de la cuenta atras")]
    public int seconds = 30;

    [Tooltip("Texto en el que se muestra la cuenta atras")]
    /// <summary>
    /// Texto en el que se muestra la cuenta atras
    /// </summary>
    public Text timerText;
    /// <summary>
    /// Tipo de la funcion a llamar al acabar el tiempo
    /// </summary>
    public delegate void TimerFinished(); 
    
    private TimerFinished timerFinished_; // variable que indica la funcion a llamar al acabarse el tiempo
    private float initSeconds_;           // tiempo inicial (usado para hacer Reset del tiempo)
    private float timer_;                 // tiempo actual

    // flags
    private bool timerFinishedCalled_;
    private bool paused_;
    
    // inicializa las variables de Timer
    void Awake()
    {
        timer_ = seconds + (minutes * 60);
        initSeconds_ = timer_;
        timerFinishedCalled_ = false;
        paused_ = false;
    }
    
    // si no esta pausado, si no ha terminado aun -> cuenta atras
    // si ha terminado, se llama a la funcion correspondiente
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

    // restablece la variable que indica la funcion a llamar
    private void OnDestroy()
    {
        timerFinished_ = null;
    }

    /// <summary>
    /// Establece la funcion que sera llamada al acabarse el tiempo
    /// </summary>
    /// <param name="method">Funcion a llamar</param>
    public void SetMethod(TimerFinished method)
    {
        timerFinished_ = method;
    }
    
    /// <summary>
    /// Restablece el Timer a sus valores iniciales
    /// </summary>
    public void Reset()
    {
        timer_ = initSeconds_;
        UpdateText();
    }

    /// <summary>
    /// Establece un nuevo tiempo
    /// </summary>
    /// <param name="seconds">tiempo desde el que empezar la cuenta atras</param>
    public void SetTime(float seconds)
    {
        timer_ = seconds;
        if (timer_ < 0)
            timer_ = 0;
        UpdateText();
    }

    /// <summary>
    /// Devuelve el tiempo que queda de la cuenta atras
    /// </summary>
    public float GetTime()
    {
        return timer_;
    }

    /// <summary>
    /// Devuelve si la cuenta atras ha terminado o no
    /// </summary>
    public bool IsTimerFinished()
    {
        return (timer_ <= 0);
    }

    /// <summary>
    /// Pausa la cuenta atras
    /// </summary>
    public void SetPaused(bool pause)
    {
        paused_ = pause;
    }
}
