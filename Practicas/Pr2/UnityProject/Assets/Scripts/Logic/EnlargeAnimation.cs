using UnityEngine;
using UnityEngine.UI;
using UnityEngine.EventSystems;

/// <summary>
/// Componente que agranda su objeto cuanto el cursor esta sobre el,
/// y lo disminuye cuando no
/// </summary>
public class EnlargeAnimation : MonoBehaviour, IPointerExitHandler, IPointerEnterHandler
{
    public float smallScale = 1.0f;
    public float bigScale = 1.2f;

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
        transform.localScale = new Vector2(bigScale, bigScale);
    }

    private void ScaleDown()
    {
        transform.localScale = new Vector2(smallScale, smallScale);
    }

    private void OnDisable()
    {
        ScaleDown();
    }
}
