using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Advertisements;

/// <summary>
/// Componente que gestiona la visualizacion de anuncios
/// Al acabar un anuncio, llama a la funcion definida por la variable rewardMethod_
/// </summary>
[RequireComponent(typeof(Button))]
public class RewardedAds : MonoBehaviour, IUnityAdsListener
{
    private string gameId = "1486550";
    private bool rewarded = false;
    private Button myButton;
    private string myPlacementId = "rewardedVideo";
    private RewardMethod rewardMethod_; // variable que indica la funcion a ser llamada

    /// <summary>
    /// Tipo de la funcion a llamar al acabar el anuncio
    /// </summary>
    public delegate void RewardMethod();
    [Tooltip("Texto en el que se avisara de que el anuncio no esta listo")]
    public GameObject notReadyText;

    void Start()
    {
        myButton = GetComponent<Button>();
        notReadyText.SetActive(false);

        // Map the ShowRewardedVideo function to the button’s click listener:
        if (myButton) myButton.onClick.AddListener(ShowRewardedVideo);

        // Initialize the Ads listener and service:
        Advertisement.AddListener(this);
        Advertisement.Initialize(gameId, false);
    }

    // valor por defecto de la variable que indica la funcion a llamar
    private void OnDestroy()
    {
        rewardMethod_ = null;
    }

    /// <summary>
    /// Establece la funcion a la que se llamara al acabar un anuncio
    /// </summary>
    /// <param name="method">funcion a llamar</param>
    public void SetRewardMethod(RewardMethod method)
    {
        rewardMethod_ = method;
    }

    // Implement a function for showing a rewarded video ad:
    void ShowRewardedVideo()
    {
        if (Advertisement.IsReady(myPlacementId))
        {
            rewarded = false;
            Advertisement.Show(myPlacementId);
        }
        else notReadyText.SetActive(true);
    }

    // Implement IUnityAdsListener interface methods:
    public void OnUnityAdsReady(string placementId)
    {
        // If the ready Placement is rewarded, activate the button: 
        if (placementId == myPlacementId)
        {
            myButton.interactable = true;
        }
    }

    public void OnUnityAdsDidFinish(string placementId, ShowResult showResult)
    {
        // Define conditional logic for each ad completion status:
        if (showResult == ShowResult.Finished && !rewarded)
        {
            rewarded = true;
            if(rewardMethod_ != null) rewardMethod_();
        }
        else if (showResult == ShowResult.Skipped)
        {
            // Do not reward the user for skipping the ad.
        }
        else if (showResult == ShowResult.Failed)
        {
            Debug.LogWarning("The ad did not finish due to an error.");
        }
    }

    public void OnUnityAdsDidError(string message)
    {
        // Log the error.
    }

    public void OnUnityAdsDidStart(string placementId)
    {
        // Optional actions to take when the end-users triggers an ad.
    }
}