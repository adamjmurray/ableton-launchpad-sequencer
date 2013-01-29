{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 5,
			"minor" : 1,
			"revision" : 9
		}
,
		"rect" : [ 104.0, 320.0, 834.0, 624.0 ],
		"bgcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
		"bglocked" : 0,
		"defrect" : [ 104.0, 320.0, 834.0, 624.0 ],
		"openrect" : [ 0.0, 0.0, 0.0, 0.0 ],
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 0,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 0,
		"toolbarvisible" : 1,
		"boxanimatetime" : 200,
		"imprint" : 0,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"boxes" : [ 			{
				"box" : 				{
					"args" : [  ],
					"id" : "obj-28",
					"maxclass" : "bpatcher",
					"name" : "launchpad_sequencer_help_contents.maxpat",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 47.0, 185.0, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 16.0, 54.0, 801.0, 553.0 ]
				}

			}
, 			{
				"box" : 				{
					"clicktabcolor" : [ 0.94902, 0.980392, 1.0, 1.0 ],
					"clicktextcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"fontface" : 1,
					"fontname" : "Arial Bold",
					"fontsize" : 11.0,
					"hovertabcolor" : [ 0.564706, 0.643137, 0.67451, 1.0 ],
					"htabcolor" : [ 0.803922, 0.929412, 1.0, 1.0 ],
					"id" : "obj-27",
					"maxclass" : "tab",
					"multiline" : 0,
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "int", "", "" ],
					"patching_rect" : [ 47.0, 152.0, 200.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 6.0, 3.0, 823.0, 37.0 ],
					"spacing_x" : 20.0,
					"spacing_y" : 20.0,
					"tabcolor" : [ 0.466667, 0.564706, 0.643137, 1.0 ],
					"tabs" : [ "Getting Started", "Pattern Types", "Tips and Tricks", "Launchpad Shortcuts", "Timing Problems?", "MIDI Input" ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-16",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 47.0, 125.0, 32.5, 18.0 ],
					"text" : "0"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 47.0, 97.0, 60.0, 20.0 ],
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-4",
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 45.0, 26.0, 25.0, 25.0 ]
				}

			}
, 			{
				"box" : 				{
					"angle" : -88.100021,
					"bgcolor" : [ 0.584314, 0.584314, 0.584314, 1.0 ],
					"grad1" : [ 1.0, 1.0, 1.0, 1.0 ],
					"id" : "obj-1",
					"maxclass" : "panel",
					"mode" : 1,
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 577.0, 33.0, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 9.0, 42.0, 816.0, 572.0 ],
					"rounded" : 24
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-28", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-27", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"hidden" : 0,
					"midpoints" : [  ],
					"source" : [ "obj-6", 0 ]
				}

			}
 ]
	}

}
