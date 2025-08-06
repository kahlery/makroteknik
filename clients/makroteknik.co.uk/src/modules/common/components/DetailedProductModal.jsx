import React, { useState, useEffect } from "react"

// icons
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import ZoomInIcon from "@mui/icons-material/ZoomIn"
import { MdOutlineSimCardDownload } from "react-icons/md"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { TbRulerMeasure } from "react-icons/tb"

// MUI components
import {
    Box,
    Button,
    Typography,
    IconButton,
    Paper,
    Stack,
    Snackbar,
    Alert,
    useMediaQuery,
    useTheme,
} from "@mui/material"

// routing
import { useNavigate } from "react-router-dom"

// stores
import { useCartStore } from "../../cart/stores/CartStore"
import { useProductStore } from "../../product/stores/ProductStore"

const DetailedProductModal = ({
    isModalOpen = false,
    selectedProduct = {},
    setIsModalOpen,
}) => {
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0)
    const [showNotification, setShowNotification] = useState(false)
    const [zoomStyle, setZoomStyle] = useState({})
    const [isZoomed, setIsZoomed] = useState(false)

    const navigate = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))

    // store actions
    const addProduct = useCartStore((state) => state.addProduct)
    const removeProduct = useCartStore((state) => state.removeProduct)
    const isInCart = useCartStore((state) => state.isInCart)
    const getPDF = useProductStore((state) => state.getPDF)

    const handleDownloadClick = () => {
        getPDF(selectedProduct._id)
    }

    const handleAddToCart = () => {
        addProduct(selectedProduct._id, selectedSizeIndex)
        setShowNotification(true)
    }

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => setShowNotification(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [showNotification])

    useEffect(() => {
        const handleESC = (e) => {
            if (e.key === "Escape") {
                setIsModalOpen(false)
                setIsZoomed(false)
            }
        }

        if (isModalOpen) window.addEventListener("keydown", handleESC)
        return () => window.removeEventListener("keydown", handleESC)
    }, [isModalOpen, setIsModalOpen])

    if (!isModalOpen || !selectedProduct) return null

    const sizes = selectedProduct.size_2_price
        ? Object.entries(selectedProduct.size_2_price)
        : []

    return (
        <Box
            onClick={() => setIsModalOpen(false)}
            sx={{
                position: "fixed",
                left: 0,
                top: 0,
                width: "100vw",
                height: "100vh",
                bgcolor: { xs: "rgba(255,255,255,1)", md: "rgba(0,0,0,0.75)" },
                zIndex: 13000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                p: 2,
            }}
        >
            <Paper
                onClick={(e) => e.stopPropagation()}
                elevation={24}
                sx={{
                    maxWidth: { xs: "95vw", md: "80vw" },
                    minWidth: { xs: "95vw", md: "65vw" },
                    maxHeight: { xs: "90vh", md: "80vh" },
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    p: 3,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: theme.shadows[25],
                    gap: 5,
                }}
            >
                {/* Left side - Image with zoom */}
                <Box
                    sx={{
                        flexBasis: { xs: "100%", md: "40%" },
                        height: { xs: 300, md: "66svh" },
                        mb: { xs: 3, md: 0 },
                        backgroundImage: `url(${
                            process.env.PUBLIC_URL + selectedProduct.image_url
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: isZoomed ? "175%" : "contain",
                        backgroundPosition:
                            zoomStyle.backgroundPosition || "center",
                        borderRadius: 1,
                        position: "relative",
                        cursor: "zoom-in",
                        transition: "background-size 0.3s ease",
                    }}
                    onMouseMove={(e) => {
                        const { left, top, width, height } =
                            e.currentTarget.getBoundingClientRect()
                        const x = ((e.clientX - left) / width) * 100
                        const y = ((e.clientY - top) / height) * 100
                        setIsZoomed(true)
                        setZoomStyle({ backgroundPosition: `${x}% ${y}%` })
                    }}
                    onMouseLeave={() => {
                        setIsZoomed(false)
                        setZoomStyle({ backgroundPosition: "center" })
                    }}
                >
                    {isZoomed && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                bgcolor: "rgba(255,255,255,0.8)",
                                borderRadius: "50%",
                                p: 0.5,
                                boxShadow: 3,
                            }}
                        >
                            <ZoomInIcon fontSize="large" color="action" />
                        </Box>
                    )}
                </Box>

                {/* Right side - Content */}
                <Stack
                    spacing={2}
                    sx={{
                        flexBasis: { xs: "100%", md: "55%" },
                        overflowY: "auto",
                        maxHeight: { xs: "auto", md: "66svh" },
                    }}
                >
                    {/* Top buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<IoIosArrowBack />}
                            onClick={() => setIsModalOpen(false)}
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                        >
                            Back
                        </Button>
                        <Button
                            variant="text"
                            endIcon={<IoIosArrowForward />}
                            onClick={() => navigate("/cart")}
                            sx={{ textTransform: "none", fontWeight: "bold" }}
                        >
                            Go to Cart
                        </Button>
                    </Box>

                    {/* Title & product code */}
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        color="text.primary"
                    >
                        {selectedProduct.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "info",
                            display: "inline-block",
                            px: 1,
                            borderRadius: 1,
                            fontWeight: "bold",
                            opacity: 0.7,
                        }}
                    >
                        {selectedProduct.product_code}
                    </Typography>

                    <Box
                        sx={{ borderBottom: 1, borderColor: "divider", my: 1 }}
                    />

                    {/* Size selector */}
                    <Stack direction="row" spacing={1} alignItems="center">
                        <TbRulerMeasure size={20} />
                        <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="info"
                        >
                            Select a size{" "}
                            {isMobile ? "(swipe to see more)" : ""}
                        </Typography>
                    </Stack>

                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            overflowX: isMobile ? "auto" : "visible",
                            flexWrap: isMobile ? "nowrap" : "wrap",
                            maxWidth: "100%",
                            pb: 1,
                            mb: 2,
                        }}
                    >
                        {sizes.length > 0 ? (
                            sizes.map(([size, price], index) => (
                                <Button
                                    key={size}
                                    variant={
                                        index === selectedSizeIndex
                                            ? "contained"
                                            : "outlined"
                                    }
                                    color={
                                        index === selectedSizeIndex
                                            ? "primary"
                                            : "inherit"
                                    }
                                    onClick={() => setSelectedSizeIndex(index)}
                                    sx={{
                                        flexShrink: 0,
                                        minWidth: 72,
                                        px: 1.5,
                                        py: 1,
                                        display: "flex",
                                        flexDirection: "column",
                                        fontWeight: "bold",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        color=""
                                        sx={{ fontSize: 14 }}
                                    >
                                        {size}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="secondary.main"
                                        sx={{ fontSize: 14 }}
                                    >
                                        {price}
                                    </Typography>
                                </Button>
                            ))
                        ) : (
                            <Typography
                                variant="body2"
                                sx={{
                                    bgcolor: "",
                                    color: "green",
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontWeight: "bold",
                                    opacity: 0.7,
                                }}
                            >
                                1 size available, no other size options to
                                select
                            </Typography>
                        )}
                    </Box>

                    {/* Add/remove cart button and note */}
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        flexWrap="wrap"
                    >
                        {!isInCart(selectedProduct._id, selectedSizeIndex) ? (
                            <Button
                                variant="contained"
                                color="info"
                                startIcon={<ShoppingCartIcon />}
                                onClick={handleAddToCart}
                                sx={{ fontWeight: "bold" }}
                            >
                                Add to Cart
                            </Button>
                        ) : (
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<ShoppingCartIcon />}
                                onClick={() =>
                                    removeProduct(
                                        selectedProduct._id.toString(),
                                        selectedSizeIndex.toString()
                                    )
                                }
                                sx={{ fontWeight: "bold" }}
                            >
                                Remove from Cart
                            </Button>
                        )}
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ maxWidth: 240 }}
                        >
                            Quantity can be adjusted in the cart page
                        </Typography>
                    </Stack>

                    <Box
                        sx={{ borderBottom: 1, borderColor: "divider", my: 2 }}
                    />

                    {/* Description */}
                    <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color="text.primary"
                    >
                        Description:
                    </Typography>

                    <Button
                        variant="outlined"
                        startIcon={<MdOutlineSimCardDownload size={20} />}
                        onClick={handleDownloadClick}
                        sx={{
                            alignSelf: "flex-start",
                            mb: 1,
                            textTransform: "none",
                        }}
                    >
                        Download PDF
                    </Button>

                    <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{ whiteSpace: "pre-wrap", mb: 4 }}
                    >
                        {selectedProduct.description}
                    </Typography>
                </Stack>
            </Paper>

            {/* Snackbar notification */}
            <Snackbar
                open={showNotification}
                autoHideDuration={3000}
                onClose={() => setShowNotification(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Item added to cart!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default DetailedProductModal
