using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;
using UnityEngine.SceneManagement;

/// <summary>
/// Componente del Manager de la escena GameScene. Gestiona un tablero de Tiles, asi como un canvas
/// con botones para reiniciar, volver atras, comprar pista, textos, etc.
/// </summary>
public class GameManager : MonoBehaviour
{
    public static GameManager instance;

    public BoardManager boardManager;
    public Text moneyText;
    public Text hintText;
    public int moneyIncrement = 20;
    public int hintCost = 25;
    public Image currentDifficultySprite;
    public Image currentDifficultySpriteClear;
    public Text currentDifficultyText;
    public Text currentDifficultyTextClear;
    public Sprite[] difficultySprites;
    public RewardedAds rewardedComp;
    public GameObject clearPanel;
    public GameObject notEnoughMoney;

    private static DataManager DataManager_;
    private int money_;
    private int level_;

    // establece la funcion a la que rewardedComp llamara al ver un anuncio
    void Awake()
    {
        instance = this;
        DataManager_ = DataManager.instance;
        rewardedComp.SetRewardMethod(Reward);
    }
    
    // inicializa atributos
    void Start()
    {
        clearPanel.SetActive(false);
        notEnoughMoney.SetActive(false);
        money_ = DataManager_.money;
        moneyText.text = money_.ToString();

        level_ = DataManager_.numLevel;

        SetLevelName();

        hintText.text = hintCost.ToString();
        boardManager.LoadLevel(level_);
    }

    // comprueba si se ha completado el nivel para pasar al siguiente (activar canvas de paso de nivel)
    void Update()
    {
        if (boardManager.LevelCompleted() && !boardManager.isButtonDown && !boardManager.IsAnimated() && boardManager.onFocus_)
        {
            boardManager.onFocus_ = false;
            UnlockNextLevel();
            clearPanel.SetActive(true);
        }
    }

    // establece el numero del nivel actual junto con la dificultad a la que pertenece en el UI
    private void SetLevelName()
    {
        currentDifficultySprite.sprite = difficultySprites[DataManager_.difficultyLevel];
        currentDifficultySpriteClear.sprite = difficultySprites[DataManager_.difficultyLevel];
        currentDifficultyText.text = (DataManager_.difficultiesInfo[DataManager_.difficultyLevel].currentLevel).ToString();
        currentDifficultyTextClear.text = (DataManager_.difficultiesInfo[DataManager_.difficultyLevel].currentLevel).ToString();
    }

    /// <summary>
    /// Avanza el nivel actual y desbloquea el siguiente nivel si fuera necesario
    /// </summary>
    public void UnlockNextLevel()
    {
        if (DataManager_.difficultiesInfo[DataManager_.difficultyLevel].currentLevel ==
            DataManager_.difficultiesInfo[DataManager_.difficultyLevel].numLevelsUnLocked)
        {
            DataManager_.difficultiesInfo[DataManager_.difficultyLevel].numLevelsUnLocked++;
        }

        DataManager_.difficultiesInfo[DataManager_.difficultyLevel].currentLevel++;
    }

    /// <summary>
    /// Carga el siguiente nivel
    /// </summary>
    public void ToNextLevel()
    {
        level_++;
        DataManager_.numLevel = level_;
        boardManager.LoadLevel(level_);

        int lastLevel = 0;
        for (int i = 0; i < DataManager_.difficultyLevel + 1; i++)
            lastLevel += DataManager_.difficultiesInfo[i].numLevels;

        if (level_ > lastLevel)
        {
            DataManager_.difficultyLevel++;
            DataManager_.difficultiesInfo[DataManager_.difficultyLevel].currentLevel = 1;
        }

        SetLevelName();
        clearPanel.SetActive(false);
    }

    /// <summary>
    /// Muestra las siguientes pistas si tienes dinero suficiente para comprarlas
    /// Si no, se informa mediante un texto de que no tienes dinero suficiente
    /// </summary>
    public void ShowHints()
    {
        if (!boardManager.IsAnimated())
        {
            if (money_ >= hintCost && !boardManager.AllHintsGiven())
            {
                money_ -= hintCost;
                DataManager_.money = money_;
                moneyText.text = money_.ToString();
                StartCoroutine(boardManager.ShowHint());
            }
            else if (money_ < hintCost)
                notEnoughMoney.SetActive(true);
        }
    }

    // Recompensa por ver un anuncio
    private void Reward()
    {
        money_ += moneyIncrement;
        DataManager_.money = money_;
        moneyText.text = money_.ToString();
    }

    /// <summary>
    /// Reinicia por completo el nivel actual
    /// </summary>
    public void RestartLevel()
    {
        if (!boardManager.IsAnimated())
            boardManager.RestartFrom(0);
    }

    public void BackToLevelSelector()
    {
        if(!boardManager.IsAnimated())
            SceneManager.LoadScene("LevelSelectorScene");
    }

    public void BackToMenu()
    {
        SceneManager.LoadScene("MenuScene");
    }

    /// <summary>
    /// Inicia la animacion del tablero al acabar un nivel (escalado progresivo de sus Tiles)
    /// </summary>
    public void StartEndLevelAnimation()
    {
        boardManager.StartAnimation();
        clearPanel.SetActive(false);
    }
}
