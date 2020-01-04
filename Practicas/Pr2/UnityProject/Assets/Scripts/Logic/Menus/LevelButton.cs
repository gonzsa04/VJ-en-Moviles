using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Componente que tendran los botones que representen un nivel en la escena LevelSelectorScene
/// Si el nivel esta bloqueado, apareceran con candado y no seran interactuables. Si no, apareceran con el numero del nivel
/// </summary>
public class LevelButton : MonoBehaviour
{
    [Tooltip("Texto donde se escribira el numero de nivel que representa el boton")]
    public Text textComponent;
    [Tooltip("Sprite que aparecera cuando el boton represente un nivel bloqueado")]
    public Sprite blockedSprite;

    private int level_; // nivel que representa el boton

    // anyade un listener al metodo onClick. Si el nivel que representa esta bloqueado, le pone la imagen del candado
    // y desactiva todos sus hijos (texto e imagen de la estrella)
    void Start()
    {
        Button btn = gameObject.GetComponent<Button>(); 
        btn.onClick.AddListener(Click);  //subscribe to the onClick event

        if (DataManager.instance.difficultiesInfo[DataManager.instance.difficultyLevel].numLevelsUnLocked <= level_ - 1)
        {
            btn.enabled = false;
            GetComponent<EnlargeAnimation>().enabled = false;

            gameObject.GetComponent<Image>().sprite = blockedSprite;
            for (int i = 0; i < transform.childCount; i++)
            {
                transform.GetChild(i).gameObject.SetActive(false);
            }
        }
    }

    // lleva al nivel representado por el boton
    private void Click()
    {
        LevelSelectorManager.instance.GoToLevel(level_);
    }

    /// <summary>
    /// Establece el nivel que representara el boton, de 1 a numLevels
    /// Lo escribe en el formato de tres digitos
    /// </summary>
    public void SetLevel(int level)
    {
        level_ = level;
        textComponent.text = level_.ToString("000");
    }
}
