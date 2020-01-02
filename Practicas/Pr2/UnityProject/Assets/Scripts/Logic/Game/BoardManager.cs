using System.Collections;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// Tablero de Tiles que se encarga de instanciar los niveles del juego y gestionar cada uno de los Tiles que lo conforman
/// Puede adaptarse a distintas resoluciones y aspect ratio, ademas de tener dos modos de tablero (small: 6x5 y big:6x8)
/// </summary>
public class BoardManager : MonoBehaviour
{
    private List<GameObject> board_; // tabla (lista) de Tiles
    private List<bool> boolBoard_;   // tabla (lista) auxiliar de bool (Tile pulsado o no)
    private List<int> path_;         // lista con los indices de la tabla que forman parte del camino

    private float tileWidth_, tileHeight_;
    private const float baseWidth_ = 5.62f;    // ancho jugable estandar (1080:1920)
    private const float baseHeight_ = 6.21f;   // alto jugable estandar (1080:1920)
    private float factor_;
    private int rows = 3, cols = 3;
    private int[,] hints_;
    private int lastHint_ = 1;
    private int skinIndex_;
    
    public SpriteRenderer tracker;  // huella que deja el dedo al pulsar
    public GameObject tilePrefab;   // modelo de tile a instanciar
    [Tooltip("Sprite que determina el limite de juego por arriba")]
    public Sprite topLimit;
    [Tooltip("Sprite que determina el limite de juego por abajo")]
    public Sprite bottomLimit;
    [Tooltip("Posibles skins. Se elegira una alearoria")]
    public List<Skin> skins;

    [Tooltip("Resolucion para tableros de 6x5")]
    public float smallBoardScale = 0.8f;
    [Tooltip("Resolucion para tableros de 6x8")]
    public float bigBoardScale = 0.6f;
    public int numHintsGiven = 5;   // numero de pistas que da "comprar pista"

    [HideInInspector]
    public bool isButtonDown;

    /// <summary>
    /// Inicializa los campos de boardManager, establece el factor de escala que usara el tablero y carga todos los niveles
    /// </summary>
    void Awake()
    {
        board_ = new List<GameObject>();
        boolBoard_ = new List<bool>();
        path_ = new List<int>();
        isButtonDown = false;

        tracker.gameObject.SetActive(false);

        SetFactor();
    }

    /// <summary>
    /// Carga el nivel indicado
    /// Borra la tabla anterior, actualiza rows y cols, establece el modo de tablero que va a usar (6x5 - 6x8),
    /// y crea e instancia los tiles en posiciones consecutivas y los añade a board_, 
    /// formando una matriz de Tiles de dimensiones rows * cols.
    /// Por ultimo, reescala y reposiciona toda la tabla si es necesario para adaptarse al aspect ratio y el tamanyo de la ventana
    /// 2 es inicio del camino, 1 es tile normal y 0 es inactivo.
    /// </summary>
    public void LoadLevel(int number)
    {
        Reset();

        JsonLoader.LevelInfo levelInfo = LoadManager.instance.jsonLoader.LoadByNumber(number);
        rows = levelInfo.layout_.Length;
        cols = levelInfo.layout_[0].Length;
        hints_ = levelInfo.path_;

        if (rows <= 5) transform.localScale = new Vector2(smallBoardScale, smallBoardScale);
        else transform.localScale = new Vector2(bigBoardScale, bigBoardScale);

        tileWidth_ = transform.localScale.x;
        tileHeight_ = transform.localScale.y;

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                GameObject newTile = Instantiate(tilePrefab, transform);
                newTile.GetComponent<Tile>().SetSkin(skins[skinIndex_]);

                Vector2 tilePosition = new Vector2(newTile.transform.position.x + j * tileWidth_,
                   newTile.transform.position.y + i * tileHeight_);

                newTile.transform.position = tilePosition;

                board_.Add(newTile);
                boolBoard_.Add(false);

                if (levelInfo.layout_[Mathf.Abs(i - (rows - 1))][j] == '2')
                    PressTile(i * cols + j, true); // inicial
                if (levelInfo.layout_[Mathf.Abs(i - (rows - 1))][j] == '0')
                    newTile.SetActive(false);
            }
        }

        FitScaleToAspectRatio();
        FitPosition();
    }

    /// <summary>
    /// Restablece la tabla de Tiles, el camino recorrido y la ultima pista mostrada
    /// Elige la nueva skin aleatoria
    /// </summary>
    private void Reset()
    {
        skinIndex_ = Random.Range(0, 7);
        tracker.GetComponent<SpriteRenderer>().sprite = skins[skinIndex_].tracker;

        for (int i = 0; i < board_.Count; i++)
        {
            Destroy(board_[i].gameObject);
        }
        board_.Clear();
        boolBoard_.Clear();
        path_.Clear();

        lastHint_ = 1;
    }

    public void RestartFrom(int indexInPath)
    {
        for (int currentCount = path_.Count - 1; indexInPath == -1 || currentCount > indexInPath; currentCount--)
        {
            PressTile(path_[currentCount], false);
        }
    }

    /// <summary>
    /// Establece el factor de escala que usara el tablero para ocupar el mayor hueco posible dentro del area de juego,
    /// usando como referencia el area estandar para la que esta preparada su escala por defecto
    /// </summary>
    private void SetFactor()
    {
        float height = Camera.main.orthographicSize * 2;
        float width = Camera.main.aspect * height;

        float topFactor = topLimit.rect.width / topLimit.rect.height;
        float bottomFactor = bottomLimit.rect.width / bottomLimit.rect.height;
        float topHeight = width / topFactor;
        float bottomHeight = width / bottomFactor;
        float xFactor_ = (float)width / (float)baseWidth_;
        float yFactor_ = (float)(height - (topHeight + bottomHeight)) / (float)baseHeight_;
        
        if (yFactor_ < xFactor_)
            factor_ = yFactor_;
        else
            factor_ = xFactor_;
    }

    /// <summary>
    /// Ajusta la escala del tablero (y todos sus hijos / llamar despues de loadLevel()) al aspect ratio y al tamaño de la ventana
    /// </summary>
    private void FitScaleToAspectRatio()
    {
        Vector2 aux = transform.localScale * factor_;
        tileWidth_ = aux.x;
        tileHeight_ = aux.y;
        transform.localScale = aux;
    }

    /// <summary>
    /// Ajusta la posicion del tablero para que este salga centrado en pantalla
    /// </summary>
    public void FitPosition()
    {
        Vector2 aux = new Vector2(0, 0);

        aux.x = -cols * tileWidth_ / 2 + tileWidth_ / 2;
        aux.y = -rows * tileHeight_ / 2 + tileHeight_ / 2;
        transform.position = aux;

        //Vector2 aux = new Vector2(0, 0);

        //float yOffset = Mathf.Abs(topLimit.rect.height - bottomLimit.rect.yMin);
        //Vector3 yOffsetInWorld = new Vector3(0, yOffset, 0);
        //Debug.Log(factor_);
        //aux.x = -cols * tileWidth_ / 2 + tileWidth_ / 2;
        //aux.y = -((Camera.main.ScreenToWorldPoint(yOffsetInWorld).y / 2) * factor_) - ((rows * tileHeight_ / 2) - (tileHeight_ / 2));
        //transform.position = aux;
    }

    /// <summary>
    /// Muestra las numHintsGiven_ siguientes pistas
    /// </summary>
    public IEnumerator ShowHint()
    {
        for(int i = lastHint_; i < lastHint_ + numHintsGiven; i++)
        {
            if(i >= hints_.GetLength(0)) break;

            int hintIndex = Mathf.Abs(hints_[i, 0] - (rows - 1)) * cols + hints_[i, 1];
            Tile tileComponent = board_[hintIndex].GetComponent<Tile>();

            int lasthintIndex = Mathf.Abs(hints_[i - 1, 0] - (rows - 1)) * cols + hints_[i - 1, 1];

            Tile.Direction dir = TileDirection(hintIndex, lasthintIndex);
            tileComponent.AddHint(dir);

            yield return new WaitForSeconds(.2f);
        }

        lastHint_ += numHintsGiven;
    }

    public bool AllHintsGiven()
    {
        return (lastHint_ >= hints_.GetLength(0));
    }

    void Update()
    {
        HandleInput();
    }

#if (!UNITY_EDITOR && UNITY_ANDROID || UNITY_IOS)
    /// <summary>
    /// Gestor de Input en dispositivos moviles. Recoge el evento de pulsacion del primer dedo (solo uno permitido en la aplicacion)
    /// Dedo pulsado: pasa la posicion a coordenadas del tablero (num col y num row), activa la huella y procesa el input en esa posicion
    /// Dedo levantado: desactiva la huella y se comprueba si ha completado el camino
    /// </summary>
    private void HandleInput()
    {
        if (Input.touches.Length != 0)
        {
            foreach (Touch touch in Input.touches)
            {
                if (touch.fingerId == 0 && touch.phase != TouchPhase.Canceled)
                {
                    if (touch.phase != TouchPhase.Ended) // dedo pulsado
                    {
                        isButtonDown = true;
                        Vector3 touchPos = PositionToWorldCoordinates(touch.position);

                        tracker.transform.position = touchPos;
                        tracker.gameObject.SetActive(false);

                        if (IsInsideBoard(touchPos))
                        {
                            int col, row;
                            ParseToBoardPosition(touchPos, out col, out row);

                            tracker.gameObject.SetActive(true);

                            ProcessInput(col, row);
                        }
                    }
                    else // dedo levantado
                    {
                        isButtonDown = false;
                        tracker.gameObject.SetActive(false);
                    }
                    break;
                }
            }
        }
    }

#else
    /// <summary>
    /// Gestor de Input en PC. Recoge el evento de pulsacion del raton
    /// Raton pulsado: pasa la posicion a coordenadas del tablero (num col y num row), activa la huella y procesa el input en esa posicion
    /// Raton levantado: desactiva la huella y se comprueba si ha completado el camino
    /// </summary>
    private void HandleInput()
    {
        if (Input.GetMouseButton(0))
        {
            isButtonDown = true;
            Vector3 mousePos = PositionToWorldCoordinates(Input.mousePosition);

            tracker.transform.position = mousePos;
            tracker.gameObject.SetActive(false);

            if (IsInsideBoard(mousePos))
            {
                int col, row;
                ParseToBoardPosition(mousePos, out col, out row);

                tracker.gameObject.SetActive(true);

                ProcessInput(col, row);
            }
        }
        else if (Input.GetMouseButtonUp(0))
        {
            isButtonDown = false;
            tracker.gameObject.SetActive(false);
        }
    }
#endif

    /// <summary>
    /// Indica si el nivel actual ha sido completado: todas sus casillas han sido seleccionadas
    /// </summary>
    /// <returns></returns>
    public bool LevelCompleted()
    {
        int selected = 0;
        for(int i = 0; i < boolBoard_.Count; i++)
        {
            if (boolBoard_[i]) selected++;
        }

        return (selected == hints_.GetLength(0));
    }

    /// <summary>
    /// Devuelve la direccion hacia la que se encuentra "b" respecto a "a"
    /// </summary>
    private Tile.Direction TileDirection(int a, int b)
    {
        Tile.Direction dir = Tile.Direction.UNDEFINED;
        if (a == b + 1) dir = Tile.Direction.LEFT;
        else if (a == b - 1) dir = Tile.Direction.RIGHT;
        else if (a == b - cols) dir = Tile.Direction.UP;
        else if (a == b + cols) dir = Tile.Direction.DOWN;

        return dir;
    }

    /// <summary>
    /// Transforma una posicion a coordenadas del mundo
    /// </summary>
    /// <param name="pos">Posicion a transformar</param>
    /// <returns>Transformacion a coordenadas del mundo</returns>
    private Vector3 PositionToWorldCoordinates(Vector3 pos)
    {
        Vector3 processedPos = Camera.main.ScreenToWorldPoint(pos);
        processedPos = transform.InverseTransformPoint(processedPos) * transform.localScale.x;
        processedPos += transform.position;

        processedPos.z = -1;

        return processedPos;
    }

    /// <summary>
    /// Parsea una posicion a coordenadas del tablero de tiles (numero de fila y columna)
    /// </summary>
    /// <param name="pos">Posicion a parsear, asumiendo que esta en coordenadas del mundo</param>
    /// <param name="col">Numero de columna de "pos" dentro del tablero, adquiere valor dentro del metodo</param>
    /// <param name="row">Numero de fila de "pos" dentro del tablero, adquiere valor dentro del metodo</param>
    private void ParseToBoardPosition(Vector3 pos, out int col, out int row)
    {
        float difx = Mathf.Abs(transform.position.x - pos.x);
        float dify = Mathf.Abs(transform.position.y - pos.y);
        col = Mathf.RoundToInt(difx / tileWidth_);
        row = Mathf.RoundToInt(dify / tileHeight_);
    }

    /// <summary>
    /// Dada la posicion del tablero que se ha pulsado: si el Tile no estaba pulsado, es adyacente al camino actual y esta activo,
    /// lo selecciona. Si el Tile estaba ya pulsado, deselecciona todos los Tiles que formaban parte del camino actual hasta
    /// este Tile, sin incluirle.
    /// </summary>
    /// <param name="col">Numero de columna del Tile pulsado</param>
    /// <param name="row">Numero de fila del Tile pulsado</param>
    private void ProcessInput(int col, int row)
    {
        int i = row * cols + col;
        if (!boolBoard_[i] && IsAdyacentToPath(i) && board_[i].activeSelf)
        {
            PressTile(i, true);
        }
        else if (boolBoard_[i])
        {
            int indexInPath = path_.IndexOf(i);
            RestartFrom(indexInPath);
        }
    }

    /// <summary>
    /// Dado un index de la tabla de tiles, lo establece a seleccionado o no
    /// Si se selecciona, se anyade al camino actual
    /// Si se deselecciona, se quita del camino actual
    /// </summary>
    /// <param name="boardIndex">Index de la tabla a tratar</param>
    /// <param name="pressed">Si se selecciona o no</param>
    private void PressTile(int boardIndex, bool pressed)
    {
        Tile tileComponent = board_[boardIndex].GetComponent<Tile>();
        boolBoard_[boardIndex] = pressed;
        tileComponent.SetPressed(pressed);

        if (pressed)
        {
            if (path_.Count > 0) // se anyade a un camino existente
            {
                int lastTileIndex = path_[path_.Count - 1];
                Tile.Direction dir = TileDirection(boardIndex, lastTileIndex);
                tileComponent.AddPath(dir);
            }

            path_.Add(boardIndex); // se anyade como inicio de camino
        }
        else path_.Remove(boardIndex);
    }

    /// <summary>
    /// Indica si una posicion (en coordenadas del mundo) esta dentro o no del tablero de tiles
    /// </summary>
    private bool IsInsideBoard(Vector2 pos)
    {
        return (pos.x >= transform.position.x - tileWidth_ / 2 && pos.x < transform.position.x + cols * tileWidth_ - tileWidth_ / 2
                && pos.y >= transform.position.y - tileHeight_ / 2 && pos.y < transform.position.y + rows * tileHeight_ - tileHeight_ / 2);
    }

    /// <summary>
    /// Indica si un index es adyacente (arriba, abajo, izquierda, derecha) al camino actual
    /// </summary>
    private bool IsAdyacentToPath(int index)
    {
        return (((index + 1 == path_[path_.Count - 1] || index - 1 == path_[path_.Count - 1]) 
            && index /cols == path_[path_.Count - 1]/cols) ||                                  // izq-der
            index + cols == path_[path_.Count - 1] || index - cols == path_[path_.Count - 1]); // arriba-abajo
    }
}
