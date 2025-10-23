'use client'

import { useControls, button, folder } from 'leva'
import { useCallback, useEffect, useRef } from 'react'

interface ControlsPanelProps {
  onSettingsChange: (settings: any) => void
  onExportSettings: () => void
}

export default function ControlsPanel({ onSettingsChange, onExportSettings }: ControlsPanelProps) {
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const settings = useControls({
    // Lighting Controls
    'Environment & Lighting': folder({
      hdriIntensity: {
        value: 1,
        min: 0,
        max: 3,
        step: 0.1,
        label: 'HDRI Intensity'
      },
      environmentRotation: {
        value: 0,
        min: 0,
        max: 360,
        step: 1,
        label: 'Environment Rotation (°)'
      },
      directionalLightIntensity: {
        value: 1,
        min: 0,
        max: 5,
        step: 0.1,
        label: 'Directional Light Intensity'
      },
      directionalLightAngle: {
        value: 45,
        min: 0,
        max: 360,
        step: 5,
        label: 'Directional Light Angle (°)'
      },
      ambientLightColor: {
        value: '#ffffff',
        label: 'Ambient Light Color'
      },
      ambientLightIntensity: {
        value: 0.5,
        min: 0,
        max: 2,
        step: 0.1,
        label: 'Ambient Light Intensity'
      }
    }),
    
    // Material Controls
    'Material Properties': folder({
      roughness: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.01,
        label: 'Roughness'
      },
      metalness: {
        value: 0.0,
        min: 0,
        max: 1,
        step: 0.01,
        label: 'Metalness'
      }
    }),

    // Part Color Controls
    'Part Colors': folder({
      part1Color: {
        value: '#888888',
        label: 'Part1.002 Color'
      },
      part2Color: {
        value: '#666666',
        label: 'Part2.002 Color'
      },
      part2_004Color: {
        value: '#aaaaaa',
        label: 'Part2.004 Color'
      },
      part4Color: {
        value: '#999999',
        label: 'Part4.004 Color'
      }
    }),
    
    // Background Controls
    'Background & Scene': folder({
      backgroundType: {
        value: 'hdri',
        options: {
          'HDRI Environment': 'hdri',
          'Solid Color': 'color',
          'Studio Preset': 'studio'
        },
        label: 'Background Type'
      },
      backgroundColor: {
        value: '#2a2a2a',
        label: 'Background Color'
      },
      enableShadows: {
        value: true,
        label: 'Enable Shadows'
      },
      shadowOpacity: {
        value: 0.3,
        min: 0,
        max: 1,
        step: 0.1,
        label: 'Shadow Opacity'
      }
    }),
    
    // Export Controls
    'Export Settings': folder({
      'Export Current Settings': button(() => onExportSettings()),
      'Reset to Defaults': button(() => {
        // This will trigger a reset of all controls to their default values
        window.location.reload()
      })
    })
  })

  // Update parent component whenever settings change with debouncing
  useEffect(() => {
    // Clear any pending updates
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }

    // Debounce the settings update
    updateTimeoutRef.current = setTimeout(() => {
      try {
        onSettingsChange(settings)
      } catch (error) {
        console.error('Error updating settings:', error)
      }
    }, 100) // 100ms debounce for Leva controls

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [settings, onSettingsChange])

  return null // Leva handles its own rendering
}
