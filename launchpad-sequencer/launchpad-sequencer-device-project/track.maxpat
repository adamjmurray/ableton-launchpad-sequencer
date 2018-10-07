{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 0,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"rect" : [ 1068.0, 169.0, 672.0, 504.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-16",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "bang" ],
					"patching_rect" : [ 45.0, 219.199997, 60.0, 22.0 ],
					"presentation_rect" : [ 45.0, 219.199997, 60.0, 22.0 ],
					"style" : "",
					"text" : "loadbang"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-18",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 45.0, 255.199997, 87.0, 22.0 ],
					"presentation_rect" : [ 45.0, 255.199997, 87.0, 22.0 ],
					"style" : "",
					"text" : "set TRACK #1"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontname" : "Ableton Sans",
					"fontsize" : 9.5,
					"id" : "obj-15",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 45.0, 292.200012, 130.0, 17.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 0.0, 46.0, 17.0 ],
					"style" : "",
					"text" : "TRACK"
				}

			}
, 			{
				"box" : 				{
					"comment" : "selected pattern index",
					"id" : "obj-13",
					"index" : 0,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 230.0, 48.199997, 30.0, 30.0 ],
					"presentation_rect" : [ 230.0, 48.199997, 30.0, 30.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"bgmode" : 0,
					"border" : 0,
					"clickthrough" : 0,
					"enablehscroll" : 0,
					"enablevscroll" : 0,
					"id" : "obj-1",
					"lockeddragscroll" : 0,
					"maxclass" : "bpatcher",
					"name" : "patterns.maxpat",
					"numinlets" : 1,
					"numoutlets" : 0,
					"offset" : [ -768.0, 0.0 ],
					"patching_rect" : [ 230.0, 113.199997, 128.0, 128.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 165.5, 0.0, 128.0, 170.0 ],
					"varname" : "patterns",
					"viewvisibility" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 316.0, 14.0, 65.0, 22.0 ],
					"presentation_rect" : [ 316.0, 14.0, 65.0, 22.0 ],
					"restore" : [ 0.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "mute[16]",
							"parameter_mmax" : 1.0,
							"parameter_shortname" : "mute",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr mute",
					"varname" : "mute"
				}

			}
, 			{
				"box" : 				{
					"automation" : "active",
					"automationon" : "mute",
					"id" : "obj-17",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 339.0, 48.0, 44.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 0.0, 21.0, 44.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "mute_ui[11]",
							"parameter_invisible" : 2,
							"parameter_mmax" : 1.0,
							"parameter_shortname" : "mute_ui",
							"parameter_enum" : [ "active", "mute" ],
							"parameter_type" : 1
						}

					}
,
					"text" : "mute",
					"texton" : "mute",
					"varname" : "mute_ui"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 70.5, 166.199997, 90.0, 22.0 ],
					"presentation_rect" : [ 70.5, 166.199997, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "multiplier",
							"parameter_shortname" : "multiplier",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr multiplier",
					"varname" : "multiplier"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-7",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 70.5, 123.800003, 90.0, 22.0 ],
					"presentation_rect" : [ 70.5, 123.800003, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "gate",
							"parameter_shortname" : "gate",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr gate",
					"varname" : "gate"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 70.5, 81.400002, 90.0, 22.0 ],
					"presentation_rect" : [ 70.5, 81.400002, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "velocity",
							"parameter_shortname" : "velocity",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr velocity",
					"varname" : "velocity"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "" ],
					"patching_rect" : [ 70.5, 39.0, 90.0, 22.0 ],
					"presentation_rect" : [ 70.5, 39.0, 90.0, 22.0 ],
					"restore" : [ 0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_longname" : "pitch",
							"parameter_shortname" : "pitch",
							"parameter_type" : 1
						}

					}
,
					"saved_object_attributes" : 					{
						"parameter_enable" : 1
					}
,
					"style" : "",
					"text" : "pattr pitch",
					"varname" : "pitch"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-18", 0 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-15", 0 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-17", 0 ],
					"source" : [ "obj-33", 1 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-1::obj-8::obj-8" : [ "end_ui", "end_ui", 0 ],
			"obj-1::obj-5::obj-7" : [ "mute_ui[3]", "mute_ui", 0 ],
			"obj-1::obj-5::obj-2" : [ "steps[3]", "steps", 0 ],
			"obj-1::obj-7::obj-24" : [ "end[1]", "end", 0 ],
			"obj-1::obj-7::obj-8" : [ "end_ui[1]", "end_ui", 0 ],
			"obj-1::obj-3::obj-33" : [ "mute[5]", "mute", 0 ],
			"obj-1::obj-4::obj-1" : [ "start_ui[4]", "start_ui", 0 ],
			"obj-1::obj-2::obj-22" : [ "start[6]", "start", 0 ],
			"obj-1::obj-4::obj-7" : [ "mute_ui[4]", "mute_ui", 0 ],
			"obj-1::obj-8::obj-1" : [ "start_ui", "start_ui", 0 ],
			"obj-1::obj-8::obj-22" : [ "start", "start", 0 ],
			"obj-1::obj-1::obj-24" : [ "end[7]", "end", 0 ],
			"obj-17" : [ "mute_ui[11]", "mute_ui", 0 ],
			"obj-1::obj-7::obj-22" : [ "start[1]", "start", 0 ],
			"obj-1::obj-3::obj-24" : [ "end[5]", "end", 0 ],
			"obj-1::obj-8::obj-2" : [ "steps", "steps", 0 ],
			"obj-1::obj-5::obj-8" : [ "end_ui[3]", "end_ui", 0 ],
			"obj-1::obj-5::obj-22" : [ "start[3]", "start", 0 ],
			"obj-1::obj-5::obj-24" : [ "end[3]", "end", 0 ],
			"obj-1::obj-2::obj-33" : [ "mute[6]", "mute", 0 ],
			"obj-1::obj-4::obj-8" : [ "end_ui[4]", "end_ui", 0 ],
			"obj-1::obj-4::obj-2" : [ "steps[4]", "steps", 0 ],
			"obj-1::obj-6::obj-33" : [ "mute[2]", "mute", 0 ],
			"obj-1::obj-1::obj-22" : [ "start[7]", "start", 0 ],
			"obj-8" : [ "multiplier", "multiplier", 0 ],
			"obj-1::obj-6::obj-2" : [ "steps[2]", "steps", 0 ],
			"obj-1::obj-3::obj-22" : [ "start[5]", "start", 0 ],
			"obj-1::obj-1::obj-8" : [ "end_ui[7]", "end_ui", 0 ],
			"obj-1::obj-8::obj-7" : [ "mute_ui", "mute_ui", 0 ],
			"obj-1::obj-6::obj-1" : [ "start_ui[2]", "start_ui", 0 ],
			"obj-7" : [ "gate", "gate", 0 ],
			"obj-1::obj-6::obj-7" : [ "mute_ui[2]", "mute_ui", 0 ],
			"obj-1::obj-1::obj-33" : [ "mute[7]", "mute", 0 ],
			"obj-1::obj-4::obj-24" : [ "end[4]", "end", 0 ],
			"obj-1::obj-3::obj-1" : [ "start_ui[5]", "start_ui", 0 ],
			"obj-1::obj-3::obj-2" : [ "steps[5]", "steps", 0 ],
			"obj-1::obj-2::obj-7" : [ "mute_ui[6]", "mute_ui", 0 ],
			"obj-1::obj-6::obj-8" : [ "end_ui[2]", "end_ui", 0 ],
			"obj-1::obj-6::obj-22" : [ "start[2]", "start", 0 ],
			"obj-1::obj-2::obj-1" : [ "start_ui[6]", "start_ui", 0 ],
			"obj-1::obj-2::obj-2" : [ "steps[6]", "steps", 0 ],
			"obj-1::obj-3::obj-7" : [ "mute_ui[5]", "mute_ui", 0 ],
			"obj-1::obj-1::obj-1" : [ "start_ui[7]", "start_ui", 0 ],
			"obj-1::obj-1::obj-7" : [ "mute_ui[7]", "mute_ui", 0 ],
			"obj-33" : [ "mute[16]", "mute", 0 ],
			"obj-1::obj-7::obj-33" : [ "mute[1]", "mute", 0 ],
			"obj-5" : [ "pitch", "pitch", 0 ],
			"obj-1::obj-4::obj-22" : [ "start[4]", "start", 0 ],
			"obj-1::obj-3::obj-8" : [ "end_ui[5]", "end_ui", 0 ],
			"obj-1::obj-7::obj-2" : [ "steps[1]", "steps", 0 ],
			"obj-1::obj-2::obj-24" : [ "end[6]", "end", 0 ],
			"obj-1::obj-7::obj-1" : [ "start_ui[1]", "start_ui", 0 ],
			"obj-1::obj-1::obj-2" : [ "steps[7]", "steps", 0 ],
			"obj-1::obj-7::obj-7" : [ "mute_ui[1]", "mute_ui", 0 ],
			"obj-1::obj-2::obj-8" : [ "end_ui[6]", "end_ui", 0 ],
			"obj-1::obj-8::obj-33" : [ "mute", "mute", 0 ],
			"obj-1::obj-4::obj-33" : [ "mute[4]", "mute", 0 ],
			"obj-1::obj-8::obj-24" : [ "end", "end", 0 ],
			"obj-1::obj-5::obj-33" : [ "mute[3]", "mute", 0 ],
			"obj-6" : [ "velocity", "velocity", 0 ],
			"obj-1::obj-6::obj-24" : [ "end[2]", "end", 0 ],
			"obj-1::obj-5::obj-1" : [ "start_ui[3]", "start_ui", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "patterns.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "pattern.maxpat",
				"bootpath" : "D:/workspace/Max/Max-for-Live/m4l-launchpad-sequencer/launchpad-sequencer/launchpad-sequencer-device-project",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
