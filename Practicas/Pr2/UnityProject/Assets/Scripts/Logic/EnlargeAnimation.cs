using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

public class EnlargeAnimation : MonoBehaviour, IPointerExitHandler, IPointerEnterHandler
{
    public float scaleFactor;

    void Start()
    {
        Button myButton = GetComponent<Button>();
        
        if (myButton) myButton.onClick.AddListener(ScaleDown);
    }

    public void OnPointerEnter(PointerEventData eventData)
    {
        ScaleUp();
    }

    public void OnPointerExit(PointerEventData eventData)
    {
        ScaleDown();
    }

    private void ScaleUp()
    {
        transform.localScale = transform.localScale * scaleFactor;
    }

    private void ScaleDown()
    {
        transform.localScale = transform.localScale / scaleFactor;
    }
}
