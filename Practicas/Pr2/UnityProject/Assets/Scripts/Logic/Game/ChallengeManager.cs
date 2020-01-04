using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;
using UnityEngine.SceneManagement;

/// <summary>
/// Componente del Manager de la escena ChallengeScene. Gestiona un tablero de tiles
/// y un contador de tiempo
/// </summary>
public class ChallengeManager : MonoBehaviour
{
    public static ChallengeManager instance;

    public BoardManager boardManager;
    [Tooltip("Recompensa por completar el reto")]
    public int moneyIncrement = 50;
    public GameObject winCanvas;
    public GameObject loseCanvas;
    public RewardedAds rewardedAdsComp;
    
    private int level_;
    private bool won_;
    private Timer timerComponent_;

    // establece la funcion a la que llamara el timer al acabarse el tiempo del reto
    // y la funcion a la que se llamara cuando se vea el anuncio para duplicar la recompensa obtenida
    private void Awake()
    {
        instance = this;
        timerComponent_ = gameObject.GetComponent<Timer>();
        timerComponent_.SetMethod(GameOver);
        rewardedAdsComp.SetRewardMethod(DuplicateMoney);
    }

    // elige el nivel aleatorio al que se jugara en el reto
    void Start()
    {
        level_ = Random.Range(1, DataManager.instance.totalNumLevels + 1);
        won_ = false;
        winCanvas.SetActive(false);
        loseCanvas.SetActive(false);
        
        boardManager.LoadLevel(level_);
    }

    // comprueba si se ha completado el nivel
    void Update()
    {
        if (!won_ && boardManager.LevelCompleted() && !boardManager.isButtonDown)
        {
            won_ = true;
            Win();
        }
    }

    public void BackToMenu()
    {
       SceneManager.LoadScene("MenuScene");
    }

    /// <summary>
    /// Llamado al completar el reto y ver el anuncio para duplicar tu recompensa
    /// </summary>
    public void DuplicateMoney()
    {
        DataManager.instance.money += moneyIncrement;
        BackToMenu();
    }

    // activa el panel de victoria y se suma la recompensa
    private void Win()
    {
        boardManager.onFocus_ = false;
        winCanvas.SetActive(true);
        timerComponent_.SetPaused(true);
        DataManager.instance.money += moneyIncrement;
        DataManager.instance.medals++;
    }

    // activa el panel de derrota
    private void GameOver()
    {
        boardManager.onFocus_ = false;
        loseCanvas.SetActive(true);
    }
}
