using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

/// <summary>
/// Componente del Manager de la escena MenuScene. Gestiona el menu principal
/// con los botones de las distintas dificultades, el reto y el regalo
/// </summary>
public class MenuManager : MonoBehaviour
{
    public Text moneyText;
    public Text medalsText;
    public Text[] difficultyTexts;
    public Button challengeButtonComp;
    public GameObject timerPanel;
    public RectTransform scrollTrans;
    public RectTransform buttonPanelTrans;
    public GameObject challengePanel;
    public GameObject notEnoughMoneyText;
    public RewardedAds rewardedComp;
    public RewardedAds giftRewardedComp;

    public GameObject giftPanel;
    public GameObject giftButton;
    public GameObject giftDisabled;
    public GameObject giftButtonBig;
    public GameObject rewardPanel;
    public Text giftMoneyText;
    public int minGift = 20, maxGift = 41;

    public Timer timerChallenge_;
    public Timer timerGift_;

    private static DataManager DataManager_;
    private int giftMoney_;

    // establece las funciones que seran llamadas por los timer y los anuncios
    // y desactiva los paneles de los submenus
    void Awake()
    {
        DataManager_ = DataManager.instance;

        timerChallenge_.SetMethod(DeactivateChallengeTimer);
        timerGift_.SetMethod(ActivateGift);
        rewardedComp.SetRewardMethod(GoToChallenge);
        giftRewardedComp.SetRewardMethod(DuplicateGift);

        challengePanel.SetActive(false);
        giftDisabled.SetActive(false);
        giftPanel.SetActive(false);
    }

    // carga el tiempo de los timers, establece los textos de la UI y escribe en los textos de los
    // botones de dificultado los niveles actualmente desbloqueados. Coloca los botones
    void Start()
    {
        LoadTimer();

        moneyText.text = DataManager_.money.ToString();
        medalsText.text = DataManager_.medals.ToString();

        for (int i = 0; i < difficultyTexts.Length; i++) {
            difficultyTexts[i].text = string.Format("{0}/{1}",
                DataManager_.difficultiesInfo[i].numLevelsUnLocked, DataManager_.difficultiesInfo[i].numLevels);
        }

        FitPosition();
    }

    // carga y actualiza el tiempo de los timers
    private void LoadTimer()
    {
        int currentDay = System.DateTime.Now.DayOfYear;
        int currentTime = System.DateTime.Now.Hour * 360 + System.DateTime.Now.Minute * 60 + System.DateTime.Now.Second;
        int diffDay = (currentDay - DataManager_.day) * 24 * 60 * 60;
        int diffHour = currentTime - DataManager_.currentTime;
        int diff = Mathf.Abs(diffDay + diffHour);
        timerChallenge_.SetTime(DataManager_.challengeTimeLeft - diff);
        timerGift_.SetTime(DataManager_.giftTimeLeft - diff);

        SetTimer(!timerChallenge_.IsTimerFinished());
        if (!timerGift_.IsTimerFinished()) DisableGift();
        else ActivateGift();
    }

    // coloca los botones de dificultad centrados en pantalla para poder hacer scroll de la forma esperada si fuese necesario
    private void FitPosition()
    {
        Vector3[] corners = new Vector3[4];
        scrollTrans.GetWorldCorners(corners);
        float yTargetCorner = corners[1].y;
        buttonPanelTrans.GetWorldCorners(corners);
        float yCorner = corners[1].y;

        buttonPanelTrans.transform.position = new Vector2(buttonPanelTrans.transform.position.x,
            buttonPanelTrans.transform.position.y - (yCorner - yTargetCorner));
    }

    public void ActivateChallengeTimer()
    {
        SetTimer(true);
    }

    public void DeactivateChallengeTimer()
    {
        SetTimer(false);
    }

    private void SetTimer(bool active)
    {
        timerChallenge_.enabled = active;
        timerPanel.SetActive(active);
        challengeButtonComp.enabled = !active;
    }

    // guarda el tiempo de los timers al ser destruido (salirde la app o cambiar de escena)
    private void OnDestroy()
    {
        SaveTimers();
    }

    // si la app sale de foco guarda los tiempos de los timers
    // si la app entra en foco carga y actualiza los tiempos de los timers
    private void OnApplicationFocus(bool focus)
    {
        if (!focus)
            SaveTimers();
        else
            LoadTimer();
    }

    // anyade dinero como recompensa del regalo
    private void GiveReward()
    {
        DataManager_.money += giftMoney_;
        moneyText.text = DataManager_.money.ToString();
        giftMoneyText.text = string.Format("+{0}", giftMoney_);
    }

    // duplica el dinero proporcionado por el regalo (funcion llamada por su rewardedAds)
    private void DuplicateGift()
    {
        GiveReward();
        ResetGift();
    }

    // guarda los tiempos de los timers
    private void SaveTimers()
    { 
        DataManager_.challengeTimeLeft = (int)timerChallenge_.GetTime();
        DataManager_.giftTimeLeft = (int)timerGift_.GetTime();
        DataManager_.SaveWithTime();
    }

    /// <summary>
    /// Lleva a la escena LevelSelectorScene, con los niveles de la dificultad difficulty
    /// </summary>
    /// <param name="difficulty">dificultad de la que se quieren ver los niveles</param>
    public void GoToLevelSelector(int difficulty)
    {
        DataManager_.difficultyLevel = difficulty;
        SceneManager.LoadScene("LevelSelectorScene");
    }

    /// <summary>
    /// Activa el panel de reto
    /// </summary>
    public void StartChallenge()
    {
        challengePanel.SetActive(true);
    }

    /// <summary>
    /// Desactiva el panel de reto
    /// </summary>
    public void BackToMenu()
    {
        challengePanel.SetActive(false);
    }

    /// <summary>
    /// Lleva a la escena ChallengeScene si el jugador tiene dinero suficiente.
    /// Si no, se indica mediante un texto que no tiene dinero suficiente
    /// </summary>
    /// <param name="howMany"></param>
    public void PayForChallenge(int howMany)
    {
        if (DataManager_.money >= howMany)
        {
            DataManager_.money -= howMany;
            GoToChallenge();
        }
        else
        {
            notEnoughMoneyText.SetActive(true);
        }
    }

    /// <summary>
    /// Activa el panel de la recompensa del regalo, y se da esa recompensa
    /// </summary>
    public void ActivateReward()
    {
        giftButtonBig.SetActive(false);
        rewardPanel.SetActive(true);

        giftMoney_ = Random.Range(minGift, maxGift);
        GiveReward();
    }

    /// <summary>
    /// Activa el panel del regalo, listo para clickar en el
    /// </summary>
    public void ActivateBigGift()
    {
        giftButtonBig.SetActive(true);
        giftPanel.SetActive(true);
        rewardPanel.SetActive(false);
    }

    /// <summary>
    /// Activa el boton del regalo
    /// </summary>
    public void ActivateGift()
    {
        giftButton.SetActive(true);
        giftDisabled.SetActive(false);
    }

    /// <summary>
    /// Desactiva el boton del regalo
    /// </summary>
    private void DisableGift()
    {
        giftPanel.SetActive(false);
        giftButton.SetActive(false);
        giftDisabled.SetActive(true);
    }

    /// <summary>
    /// Reset del regalo (desactiva su boton y reinicia el timer)
    /// </summary>
    public void ResetGift()
    {
        DisableGift();
        timerGift_.Reset();
    }

    private void GoToChallenge()
    {
        timerChallenge_.Reset();
        SceneManager.LoadScene("ChallengeScene");
    }

    public void QuitApplication()
    {
        Application.Quit();
    }
}
